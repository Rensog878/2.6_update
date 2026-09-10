import express from 'express';
import { db } from './db.js';

const router = express.Router();

function matchesSearch(user, search) {
    const needle = String(search).toLowerCase();
    return ['name', 'phone', 'email', 'crop', 'village', 'district', 'state'].some((key) =>
          String(user[key] || '').toLowerCase().includes(needle)
                                                                                     );
}

router.get('/users', async (req, res) => {
    try {
          const { role, sortBy, search } = req.query;
          let users = await db.getUsers();

      if (role && role !== 'all') {
              users = users.filter((u) => u.role === role);
      }
          if (search) {
                  users = users.filter((u) => matchesSearch(u, search));
          }

      users = users.slice();
          if (sortBy === 'name') {
                  users.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
          } else {
                  users.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          }

      res.json({ success: true, data: users });
    } catch (err) {
          res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.post('/users', async (req, res) => {
    try {
          const user = await db.createUser(req.body);
          res.json({ success: true, user });
    } catch (err) {
          if (err.code === 'PHONE_TAKEN' || err.code === 11000) {
                return res.status(409).json({ success: false, message: 'This mobile number is already registered.' });
          }
          res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
          const user = await db.updateUser(req.params.id, req.body);
          res.json({ success: true, user });
    } catch (err) {
          res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
          await db.deleteUser(req.params.id);
          res.json({ success: true });
    } catch (err) {
          res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.get('/profile-fields', async (req, res) => {
    try {
          const fields = await db.getProfileFields();
          res.json({ success: true, data: fields });
    } catch (err) {
          res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

router.put('/profile-fields', async (req, res) => {
    try {
          const fields = await db.saveProfileFields(req.body.fields || req.body);
          res.json({ success: true, data: fields });
    } catch (err) {
          res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

export default router;
