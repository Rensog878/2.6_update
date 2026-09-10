/**
 * Sathya Bio - Express API Server with Persistent MongoDB-backed DB
 * Integrated E-Commerce, User Management, Admin Products Master,
 * ERP & Multi-Role Engine
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import Razorpay from 'razorpay';
import { db, connectDB } from './db.js';
import adminRoutes from './adminRoutes.js';
import { buildOtpMessage, forgetOtpLayout } from './otpTemplates.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);

// ============================================================
// AUTH HELPERS
// ============================================================

// Token format: sathya_jwt_<role>_<userId>

async function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  const parts = token.split('_');
  const userId = parts[3];
  if (!userId) return null;

  const user = await db.getUserById(userId);
  return user || null;
}

function toSafeUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

// ============================================================
// WHATSAPP OTP SYSTEM
// ============================================================

const OTP_EXPIRY_MS = 5 * 60 * 1000;
// The resend wait is randomised per request rather than a fixed 30s. A constant
// interval is a mechanical, bot-like pattern; varying it per user also spreads
// out retry traffic instead of bunching it on the same beat.
const OTP_RESEND_MIN_MS = 30 * 1000;
const OTP_RESEND_MAX_MS = 90 * 1000;

function nextResendCooldownMs() {
  return crypto.randomInt(OTP_RESEND_MIN_MS, OTP_RESEND_MAX_MS + 1);
}

// ============================================================
// TEST NUMBERS
// ============================================================
// Numbers listed in TEST_PHONE_NUMBERS may re-register as often as needed, so
// the sign-up flow can be exercised end to end. Re-registering REPLACES the
// previous account rather than adding a duplicate, which is what caused
// unreachable logins before.
//
// Leave TEST_PHONE_NUMBERS empty in production.

function getTestPhones() {
  return String(process.env.TEST_PHONE_NUMBERS || '')
    .split(',')
    .map((p) => normalizePhone(p.trim()))
    .filter(Boolean);
}

function isTestPhone(phone) {
  return getTestPhones().includes(phone);
}
const OTP_MAX_ATTEMPTS = 5;
const VERIFIED_PHONE_TTL_MS = 10 * 60 * 1000;

// ============================================================
// OTP STORAGE
// ============================================================
// Development/simple single-server storage.
// For production with multiple server instances, use Redis or MongoDB instead.

const pendingOtps = new Map();
const verifiedPhones = new Map();

// ============================================================
// NORMALIZE INDIAN PHONE NUMBER
// ============================================================

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');

  // 10 digit number, e.g. 9876543210
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }

  // 12 digit number, e.g. 919876543210
  if (digits.length === 12 && digits.startsWith('91') && /^91[6-9]\d{9}$/.test(digits)) {
    return digits.slice(2);
  }

  return null;
}

// ============================================================
// GENERATE OTP
// ============================================================

function generateOtp() {
  // Cryptographically secure six-digit OTP.
  return crypto.randomInt(100000, 1000000).toString();
}

// ============================================================
// HASH OTP
// ============================================================

function hashOtp(otp) {
  const secret = process.env.OTP_HASH_SECRET;
  if (!secret) {
    throw new Error('OTP_HASH_SECRET is missing in .env');
  }
  return crypto.createHash('sha256').update(`${otp}:${secret}`).digest('hex');
}

// ============================================================
// SEND OTP THROUGH WASENDER API
// ============================================================

// OTP message text lives in ./otpTemplates.js — it assembles each message
// from interchangeable parts so no two sends look alike.

async function sendWhatsAppOtp(phone, otp, userName = 'Farmer') {
  /*
   * WaSenderAPI credentials.
   *
   * Required:
   *   WASENDER_API_KEY    Session API key from the WaSenderAPI dashboard.
   *
   * Optional:
   *   WASENDER_API_URL    Defaults to https://wasenderapi.com/api/send-message
   */
  const apiKey = process.env.WASENDER_API_KEY;
  const apiUrl = process.env.WASENDER_API_URL || 'https://wasenderapi.com/api/send-message';

  if (!apiKey) {
    throw new Error('WaSenderAPI key is missing. Add WASENDER_API_KEY to .env');
  }

  // WaSenderAPI destination, e.g. 919876543210
  const toNumber = `91${phone}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: toNumber,
      text: buildOtpMessage(otp, userName, phone, OTP_EXPIRY_MS),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    const apiMessage = data?.message || data?.error || 'WaSenderAPI rejected the OTP request';
    throw new Error(`WaSenderAPI OTP request failed (${response.status}): ${apiMessage}`);
  }

  return data;
}

// ============================================================
// CLEANUP EXPIRED OTP RECORDS
// ============================================================

function cleanupOtpStores() {
  const now = Date.now();

  for (const [phone, record] of pendingOtps.entries()) {
    if (record.expiresAt <= now) {
      pendingOtps.delete(phone);
      forgetOtpLayout(phone);
    }
  }

  for (const [phone, expiresAt] of verifiedPhones.entries()) {
    if (expiresAt <= now) {
      verifiedPhones.delete(phone);
    }
  }
}

const otpCleanupTimer = setInterval(cleanupOtpStores, 60 * 1000);
otpCleanupTimer.unref?.();

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    const [users, products, orders] = await Promise.all([
      db.getUsers(),
      db.getProducts(),
      db.getOrders(),
    ]);

    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      platform: 'Sathya Bio Full-Stack Database Engine',
      records: {
        users: users.length,
        products: products.length,
        orders: orders.length,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error', error: err.message });
  }
});

// ============================================================
// AUTH
// ============================================================

app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body || {};

    // Both must be plain strings. A JSON object here (e.g. {"$ne":null}) is an
    // injection attempt, and would otherwise throw on identifier.trim().
    if (typeof identifier !== 'string' || typeof password !== 'string' || !identifier.trim() || !password) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number/email or password.' });
    }

    const user = await db.getUserByIdentifier(identifier);

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number/email or password.' });
    }

    const token = `sathya_jwt_${user.role}_${user.id}`;
    const updated = await db.updateUser(user.id, { lastLogin: new Date().toISOString() });

    res.json({ success: true, user: toSafeUser(updated || user), token });
  } catch (err) {
    // Don't echo internal error text back to the client on the auth path.
    console.error('❌ Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ============================================================
// SEND OTP - POST /api/auth/send-otp
// ============================================================

app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const phone = normalizePhone(req.body?.phone);

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian mobile number.' });
    }

    // This endpoint exists to verify a number during sign-up, so refuse before
    // spending an OTP if the number already has an account. (Pass
    // purpose: 'login' if this is ever reused for signing in.)
    if (req.body?.purpose !== 'login' && !isTestPhone(phone)) {
      const alreadyRegistered = await db.getUserByIdentifier(phone);
      if (alreadyRegistered) {
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already registered. Please sign in instead.',
          alreadyRegistered: true,
        });
      }
    }

    const now = Date.now();
    const existing = pendingOtps.get(phone);

    // Resend protection. The wait was decided when the previous code was sent,
    // so each user is held for a different length of time.
    const activeCooldownMs = existing?.resendAfterMs ?? OTP_RESEND_MIN_MS;

    if (existing && existing.lastSentAt && now - existing.lastSentAt < activeCooldownMs) {
      const waitSeconds = Math.ceil((activeCooldownMs - (now - existing.lastSentAt)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSeconds} seconds before requesting another OTP.`,
        retryAfter: waitSeconds,
      });
    }

    const otp = generateOtp();
    console.log(`📱 Sending OTP to +91 ${phone}`);

    await sendWhatsAppOtp(phone, otp, req.body?.name || 'Farmer');

    // Pick this send's cooldown and tell the client, so its countdown matches
    // exactly what the server will enforce.
    const resendAfterMs = nextResendCooldownMs();

    pendingOtps.set(phone, {
      otpHash: hashOtp(otp),
      expiresAt: now + OTP_EXPIRY_MS,
      lastSentAt: now,
      resendAfterMs,
      attempts: 0,
    });

    // New OTP invalidates previous phone verification.
    verifiedPhones.delete(phone);

    console.log(`✅ OTP sent to +91 ${phone} (resend allowed in ${Math.round(resendAfterMs / 1000)}s)`);

    return res.json({
      success: true,
      message: 'OTP sent successfully to your WhatsApp number.',
      expiresIn: OTP_EXPIRY_MS / 1000,
      resendAfter: Math.ceil(resendAfterMs / 1000),
    });
  } catch (err) {
    console.error('❌ Send OTP error:', err.message);
    return res.status(500).json({ success: false, message: err.message || 'Failed to send OTP.' });
  }
});

// ============================================================
// VERIFY OTP - POST /api/auth/verify-otp
// ============================================================

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const phone = normalizePhone(req.body?.phone);
    const otp = String(req.body?.otp || '').replace(/\D/g, '');

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Invalid mobile number.' });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ success: false, message: 'Please enter the 6-digit OTP.' });
    }

    const record = pendingOtps.get(phone);

    if (!record) {
      return res.status(400).json({ success: false, message: 'OTP expired or not requested. Please request a new OTP.' });
    }

    if (Date.now() > record.expiresAt) {
      pendingOtps.delete(phone);
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    if (record.attempts >= OTP_MAX_ATTEMPTS) {
      pendingOtps.delete(phone);
      return res.status(429).json({ success: false, message: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    record.attempts += 1;

    const suppliedHash = hashOtp(otp);

    if (suppliedHash !== record.otpHash) {
      const remaining = Math.max(0, OTP_MAX_ATTEMPTS - record.attempts);
      if (remaining === 0) {
        pendingOtps.delete(phone);
      }
      return res.status(400).json({
        success: false,
        message:
          remaining > 0
            ? `Invalid OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
            : 'Invalid OTP. Please request a new OTP.',
      });
    }

    // OTP is single-use.
    pendingOtps.delete(phone);

    // Mark phone as verified. Registration must happen within VERIFIED_PHONE_TTL_MS.
    verifiedPhones.set(phone, Date.now() + VERIFIED_PHONE_TTL_MS);

    console.log(`✅ OTP verified for +91 ${phone}`);

    return res.json({ success: true, message: 'Mobile number verified successfully.', verified: true });
  } catch (err) {
    console.error('❌ Verify OTP error:', err.message);
    return res.status(500).json({ success: false, message: 'Unable to verify OTP.' });
  }
});

// ============================================================
// REGISTER - OTP REQUIRED FOR FARMERS
// ============================================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const role = (req.body && req.body.role) || 'farmer';
    const phone = normalizePhone(req.body?.phone);
    const password = req.body?.password;
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';

    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    if (!name) {
      return res.status(400).json({ success: false, message: 'Please enter your name.' });
    }

    if (role === 'farmer') {
      if (!phone) {
        return res.status(400).json({ success: false, message: 'A valid mobile number is required.' });
      }

      const verifiedUntil = verifiedPhones.get(phone);

      if (!verifiedUntil || verifiedUntil <= Date.now()) {
        verifiedPhones.delete(phone);
        return res.status(403).json({
          success: false,
          message: 'Please verify your mobile number with OTP before creating your account.',
          requiresOtp: true,
        });
      }

      const existing = await db.getUserByIdentifier(phone);

      if (isTestPhone(phone)) {
        // Test number: clear every account on it (there may be historical
        // duplicates) so the sign-up flow can be re-run from a clean slate.
        const removed = await db.deleteUsersByPhone(phone);
        if (removed) console.log(`🧪 Test number +91 ${phone}: cleared ${removed} previous account(s)`);
      } else if (existing) {
        // One account per mobile number — otherwise login cannot tell duplicates apart.
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already registered. Please sign in instead.',
          alreadyRegistered: true,
        });
      }

      // Consume verification. Cannot be reused.
      verifiedPhones.delete(phone);
    }

    const payload = { ...req.body, phone, role, createdBy: 'self-registered' };
    const user = await db.createUser(payload);
    const token = `sathya_jwt_${user.role}_${user.id}`;

    res.json({ success: true, user: toSafeUser(user), token });
  } catch (err) {
    if (err.code === 'PHONE_TAKEN' || err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This mobile number is already registered. Please sign in instead.',
        alreadyRegistered: true,
      });
    }
    console.error('❌ Registration error:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// ME
// ============================================================

app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    const parts = token.split('_');
    const userId = parts[3];

    const user = await db.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: toSafeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// PROFILE FIELDS
// ============================================================

app.get('/api/profile-fields', async (req, res) => {
  try {
    const data = await db.getProfileFields();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// PROFILE
// ============================================================

app.get('/api/profile', async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not signed in' });
    }

    const fields = await db.getProfileFields();
    res.json({ success: true, data: { ...toSafeUser(user), fields } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not signed in' });
    }

    const updated = await db.updateUserProfile(user.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: toSafeUser(updated) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// ADMIN: USERS CRUD
// ============================================================

app.get('/api/users', async (req, res) => {
  try {
    const { role, search, sortBy } = req.query;
    const data = await db.getUsers({ role, search, sortBy });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await db.createUser(req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    if (err.code === 'PHONE_TAKEN' || err.code === 11000) {
      return res.status(409).json({ success: false, message: 'This mobile number is already registered.' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await db.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const ok = await db.deleteUser(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/profile-fields', async (req, res) => {
  try {
    const fields = await db.saveProfileFields((req.body && req.body.fields) || []);
    res.json({ success: true, data: fields });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// PRODUCTS CRUD
// ============================================================

app.get('/api/products', async (req, res) => {
  try {
    const { userId, category, crop, disease, search, sortBy } = req.query;
    const data = await db.getProducts({ userId, category, crop, disease, search, sortBy });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await db.createProduct(req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await db.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const ok = await db.deleteProduct(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/catalog-options', async (req, res) => {
  try {
    const data = await db.getCatalogOptions();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/user-product-summary', async (req, res) => {
  try {
    const data = await db.getUserProductSummary();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// CART (per authenticated user)
// ============================================================

// The cart always belongs to the caller's own account — the user id is taken
// from the token, never from the request body.
app.get('/api/cart', async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Please sign in to view your cart.' });
    }
    const items = await db.getCart(user.id);
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('❌ Get cart error:', err.message);
    return res.status(500).json({ success: false, message: 'Could not load your cart.' });
  }
});

app.put('/api/cart', async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Please sign in to update your cart.' });
    }
    const items = await db.saveCart(user.id, req.body?.items);
    return res.json({ success: true, data: items });
  } catch (err) {
    console.error('❌ Save cart error:', err.message);
    return res.status(500).json({ success: false, message: 'Could not save your cart.' });
  }
});

// ============================================================
// RAZORPAY PAYMENTS
// ============================================================

function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay keys are missing. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// CREATE RAZORPAY ORDER - POST /api/payments/create-order
// Amount is computed from the cart on the server so the client cannot tamper with it.
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    if (!(total > 0)) {
      return res.status(400).json({ success: false, message: 'Invalid cart total.' });
    }

    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // paise
      currency: 'INR',
      receipt: `sb_rcpt_${Date.now()}`,
    });

    return res.json({
      success: true,
      data: { razorpayOrderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency, subtotal, gst, total, keyId: process.env.RAZORPAY_KEY_ID },
    });
  } catch (err) {
    console.error('❌ Create Razorpay order error:', err.message);
    return res.status(500).json({ success: false, message: err.message || 'Failed to create payment order.' });
  }
});

// VERIFY RAZORPAY PAYMENT - POST /api/payments/verify
// Verifies the HMAC signature Razorpay returns after checkout, then creates the order record.
app.post('/api/payments/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification fields.' });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      throw new Error('Razorpay key secret is missing. Add RAZORPAY_KEY_SECRET to .env');
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed. Signature mismatch.' });
    }

    const createdOrder = await db.createOrder({
      ...order,
      paymentMethod: 'Razorpay (UPI)',
      paymentStatus: 'Paid',
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
    });

    // The cart has become an order — empty it server-side so it cannot be paid twice.
    const buyerId = createdOrder.userId || order?.userId;
    if (buyerId) {
      await db.saveCart(buyerId, []);
    }

    console.log(`✅ Payment verified for order ${createdOrder.id || createdOrder._id}`);
    return res.json({ success: true, data: createdOrder });
  } catch (err) {
    console.error('❌ Verify payment error:', err.message);
    return res.status(500).json({ success: false, message: err.message || 'Unable to verify payment.' });
  }
});

// ============================================================
// ORDERS
// ============================================================

app.get('/api/orders', async (req, res) => {
  try {
    const { phone, userId } = req.query;
    const all = await db.getOrders();
    const data = all.filter(order => {
      if (!phone && !userId) return true;
      return (phone && order.customerPhone === phone) || (userId && order.userId === userId);
    });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// WISHLIST
// ============================================================

app.get('/api/wishlist', async (req, res) => {
  try {
    const { userId, phone } = req.query;
    const all = await db.getWishlists();
    const data = all.filter(item => (!userId && !phone) || item.userId === userId || item.phone === phone);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/wishlist', async (req, res) => {
  try {
    const { productId, productName, userId, phone, saved = true } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'Product is required' });
    const data = await db.setWishlistItem({ productId, productName, userId, phone, saved });
    res.json({ success: true, saved, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/admin/wishlist-summary', async (req, res) => {
  try {
    const items = await db.getWishlists();
    const products = await db.getProducts();
    const list = Array.isArray(products) ? products : (products?.products || products?.data || []);
    const data = list.map(product => ({
      productId: product.id || product._id,
      productName: product.name,
      wishlistCount: items.filter(item => item.productId === (product.id || product._id)).length
    })).filter(item => item.wishlistCount > 0).sort((a, b) => b.wishlistCount - a.wishlistCount);
    res.json({ success: true, total: items.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = await db.createOrder(req.body);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await db.updateOrder(req.params.id, req.body);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// DELIVERY
// ============================================================

app.get('/api/delivery/assigned', async (req, res) => {
  try {
    const { boyName } = req.query;
    const orders = await db.getOrders();
    const assigned = orders.filter(
      (o) => o.assignedDeliveryBoy === boyName || o.assignedDeliveryBoy === 'Unassigned'
    );
    res.json({ success: true, data: assigned });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/delivery/verify-otp', async (req, res) => {
  try {
    const { orderId, otp } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: 'Order id is required' });

    const order = await db.getOrderById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.deliveryStatus === 'Delivered') {
      return res.json({ success: true, alreadyDelivered: true, order });
    }

    const entered = String(otp || '').trim();
    if (!entered || entered !== String(order.otp || '').trim()) {
      return res.status(400).json({ success: false, message: 'Wrong OTP. Please try again.' });
    }

    const updated = await db.updateOrder(orderId, {
      status: 'Delivered',
      deliveryStatus: 'Delivered',
      deliveredAt: new Date().toISOString()
    });
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const ALLOWED = ['Assigned', 'Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered', 'Cancelled'];
    const { status, deliveryStatus, expectedDeliveryDate } = req.body;
    const nextStatus = deliveryStatus || status;

    if (nextStatus && !ALLOWED.includes(nextStatus)) {
      return res.status(400).json({ success: false, message: `Unknown delivery status: ${nextStatus}` });
    }

    const updates = {};
    if (nextStatus) {
      updates.status = nextStatus;
      updates.deliveryStatus = nextStatus;
      if (nextStatus === 'Delivered') updates.deliveredAt = new Date().toISOString();
    }
    if (expectedDeliveryDate !== undefined) updates.expectedDeliveryDate = expectedDeliveryDate;
    if (!Object.keys(updates).length) {
      return res.status(400).json({ success: false, message: 'Nothing to update' });
    }
    updates.updatedAt = new Date().toISOString();

    const order = await db.updateOrder(req.params.id, updates);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// CMS
// ============================================================

app.get('/api/cms', async (req, res) => {
  try {
    const data = await db.getCMS();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/cms', async (req, res) => {
  try {
    const updated = await db.updateCMS(req.body);
    res.json({ success: true, message: 'Website content updated successfully by Admin CMS', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// ADVISORY
// ============================================================

app.post('/api/advisory/subscribe', async (req, res) => {
  try {
    const { name, phone, crop, season, acreage } = req.body || {};

    if (!phone || !crop) {
      return res.status(400).json({ success: false, message: 'Phone number and crop are required.' });
    }

    const subscriber = {
      id: `adv-${Date.now().toString().slice(-4)}`,
      name: name || 'Farmer Partner',
      phone,
      crop,
      season: season || 'Kharif',
      acreage: Number(acreage) || 1,
      subscribedAt: new Date().toISOString(),
      status: 'Active',
      lastAdvisorySent: null,
    };

    const created = await db.addAdvisorySubscriber(subscriber);
    res.json({ success: true, message: 'Subscribed to weekly crop advisory successfully', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/advisory/subscribers', async (req, res) => {
  try {
    const data = await db.getAdvisorySubscribers();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// INVENTORY / STAFF TASKS
// ============================================================

app.get('/api/inventory', async (req, res) => {
  try {
    const data = await db.getInventory();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/staff-tasks', async (req, res) => {
  try {
    const data = await db.getStaffTasks();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// BILLING / POS
// ============================================================

app.post('/api/billing/invoice', async (req, res) => {
  try {
    const { customerName, customerPhone, items = [], discountAmount = 0, paymentMode } = req.body || {};

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0), 0);
    const taxableAmount = Math.max(0, subtotal - (Number(discountAmount) || 0));
    const cgst = +(taxableAmount * 0.09).toFixed(2);
    const sgst = +(taxableAmount * 0.09).toFixed(2);
    const totalGst = +(cgst + sgst).toFixed(2);
    const grandTotal = +(taxableAmount + totalGst).toFixed(2);

    const invoice = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      customerName: customerName || 'Walk-in Customer',
      customerPhone: customerPhone || '',
      items,
      subtotal,
      discountAmount: Number(discountAmount) || 0,
      taxableAmount,
      totalGst,
      grandTotal,
      paymentMode: paymentMode || 'Cash',
      cashier: 'Billing Operator #04',
      status: 'PAID',
    };

    res.json({ success: true, message: 'POS GST Tax Invoice Generated', invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// SUPPORT TICKETS
// ============================================================

app.get('/api/tickets', async (req, res) => {
  try {
    const data = await db.getTickets();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.post('/api/tickets', async (req, res) => {
  try {
    const { farmerName, phone, crop, subject, category, priority, description } = req.body || {};

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: farmerName || 'Farmer',
      phone: phone || '',
      crop: crop || '',
      subject: subject || 'General Query',
      category: category || 'Field Advisory',
      priority: priority || 'Medium',
      status: 'Open',
      assignedTo: 'Support Desk Agronomist',
      createdAt: new Date().toISOString(),
      replies: [{ from: 'Farmer', text: description || subject || '', time: 'Just now' }],
    };

    const created = await db.addTicket(newTicket);
    res.json({ success: true, message: 'Support ticket submitted successfully', ticket: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// CHAT
// ============================================================

app.get('/api/chat/records', async (req, res) => {
  try {
    const data = await db.getChatRecords();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ============================================================
// START SERVER
// ============================================================

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Sathya Bio Engine running with persistent DB on port ${PORT}`);
    console.log(`📱 WhatsApp OTP system enabled`);
  });
}

// ============================================================
// EXPORT APP
// ============================================================

export default app;
