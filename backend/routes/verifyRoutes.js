const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const upload = require('../middleware/upload');
const User = require('../models/User');

const getUserIdFromRequest = (req) => {
  if (req.body.userId) return req.body.userId;

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token || !process.env.JWT_SECRET) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET).id;
  } catch (err) {
    return null;
  }
};

router.post('/', upload.single('ktp'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'KTP file is required' });
    }

    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return res.status(400).json({ msg: 'userId or Bearer token is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.ktp = `/uploads/${req.file.filename}`;
    user.isVerified = 'pending';
    await user.save();

    res.json({
      msg: 'KTP uploaded. Waiting for admin verification.',
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'rejected', 'unverified'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid verification status' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      msg: 'Verification status updated',
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
