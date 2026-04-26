const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const User = require('../models/User');

router.post('/', upload.single('ktp'), async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    user.ktp = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ msg: 'KTP uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;