const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const {
      name,
      email,
      password,
      phone,
      whatsapp,
      bankName,
      accountNumber,
      accountHolder,
      ownerQR
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: 'Name, email and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,

      ktp: req.file ? `/uploads/${req.file.filename}` : '',
      isVerified: req.file ? 'pending' : 'unverified',

      whatsapp: whatsapp || phone || '',
      bankName: bankName || '',
      accountNumber: accountNumber || '',
      accountHolder: accountHolder || '',
      ownerQR: ownerQR || ''
    });

    await user.save();

    res.status(201).json({
      msg: 'User registered',
      user
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: 'Wrong password'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      token,
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
