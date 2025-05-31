const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const Admin  = require('../models/Admin');

// POST /api/admin/signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const admin = await Admin.create({ email, password: hash });
    res.status(201).json({ id: admin._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: admin._id, role: 'admin' },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

module.exports = router;
