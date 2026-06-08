const upload = require('../middleware/upload');
const express = require('express');
const router = express.Router();


const User = require('../models/User');

// DEMO MODE
// Automatically verifies the currently logged-in user

router.post('/', upload.single('ktp'), async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        msg: 'userId is required'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      });
    }

    user.isVerified = 'confirmed';
    await user.save();

    return res.status(200).json({
      success: true,
      verified: true,
      msg: 'KTP automatically verified (demo mode)',
      user
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: 'confirmed'
      },
      {
        new: true
      }
    );

    return res.status(200).json({
      success: true,
      user
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;