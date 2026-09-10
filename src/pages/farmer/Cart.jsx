import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

// The cart belongs to the signed-in user and lives on the server, so it stays
// private to them and follows them across devices.
const saveCart = (items) => axios.put('/api/cart', { items }).catch(() => {})

export default function FarmerCart() {
  const { user } = useAuth()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState(() =>
    [user?.village, user?.district, user?.state].filter(Boolean).join(', ')
  )
  const [paying, setPaying] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/cart')
      .then(r => setCart(Array.isArray(r.data?.data) ? r.data.data : []))
      .catch(() => toast.error('Could not load your cart'))
      .finally(() => setLoading(false))
  }, [])

  const update = (id, qty) => {
    if (qty < 1) { remove(id); return }
    const updated = cart.map(i => i._id === id ? { ...i, qty } : i)
    setCart(updated); saveCart(updated)
  }

  const remove = (id) => {
    const updated = cart.filter(i => i._id !== id)
    setCart(updated); saveCart(updated)
    toast.success('Item removed')
  }

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  const gst      = Math.round(subtotal * 0.18)
  const total    = subtotal + gst

  const handleCheckout = async () => {
    if (!window.Razorpay) { toast.error('Razorpay not loaded'); return }
    if (!address.trim()) { toast.error('Please enter a delivery address'); return }

    setPaying(true)
    try {
      // Server computes and trusts the amount — never take it from the client.
      const { data: orderRes } = await axios.post('/api/payments/create-order', { items: cart })
      if (!orderRes.success) throw new Error(orderRes.message || 'Could not start payment')
      const { razorpayOrderId, amount, currency, keyId } = orderRes.data

      const options = {
        key: keyId,
        order_id: razorpayOrderId,
        amount,
        currency,
        name: 'Sathya Bio',
        description: `${cart.length} item(s) — Crop Inputs`,
        prefill: {
          name: user?.name || '',
          contact: user?.mobile || user?.phone || '',
        },
        handler: async (response) => {
          try {
            const { data: verifyRes } = await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order: {
                userId: user?._id || user?.id,
                customerName: user?.name,
                customerPhone: user?.mobile || user?.phone,
                address,
                items: cart,
              },
            })
            if (!verifyRes.success) throw new Error(verifyRes.message || 'Payment verification failed')

            toast.success('Payment successful!')
            setCart([])
            navigate('/farmer/orders')
          } catch (err) {
            toast.error(err.message || 'Payment verification failed')
          }
        },
        modal: { ondismiss: () => setPaying(false) },
        theme: { color: '#22c55e' },
      }
      new window.Razorpay(options).open()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to start payment')
      setPaying(false)
    }
  }

  if (loading) return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>🛒 My Cart</h1></div>
      <div className="empty-state"><div className="spinner" /></div>
    </div>
  )

  if (cart.length === 0) return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>🛒 My Cart</h1></div>
      <div className="empty-state">
        <div className="empty-state-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Browse our premium agro inputs and add products to your cart</p>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/products')}>Shop Now</button>
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🛒 My Cart ({cart.length} items)</h1>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-img">
                {item.image || item.imageUrl
                  ? <img src={item.image || item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  : (item.emoji || '🌿')}
              </div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {[item.category, item.selectedPack].filter(Boolean).join(' · ')}
                </div>
                <div className="cart-item-price">₹{(item.price * (item.qty || 1)).toLocaleString()}</div>
              </div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => update(item._id, (item.qty || 1) - 1)}>−</button>
                <span className="qty-value">{item.qty || 1}</span>
                <button className="qty-btn" onClick={() => update(item._id, (item.qty || 1) + 1)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => remove(item._id)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card cart-summary-card">
          <div className="card-header"><div className="card-title">Order Summary</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>GST (18%)</span><span>₹{gst.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Delivery</span><span style={{ color: 'var(--brand-400)' }}>FREE</span>
            </div>
            <div style={{ borderTop: '1px solid var(--surface-border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
              <span>Total</span><span style={{ color: 'var(--brand-400)' }}>₹{total.toLocaleString()}</span>
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Delivery Address
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="House no, street, village, district, state, pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
            <button className="btn btn-primary btn-full btn-lg" onClick={handleCheckout} disabled={paying}>
              {paying ? 'Processing…' : '💳 Pay with Razorpay'}
            </button>
            <button className="btn btn-secondary btn-full" onClick={() => navigate('/farmer/products')}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
