// backend/server.js
// Server Express sederhana yang menggunakan koneksi Mongoose

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const { User } = require('../database/mongoose-schemas');

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'GearShare backend is running' });
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
