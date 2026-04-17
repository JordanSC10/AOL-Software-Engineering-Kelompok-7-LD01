// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

// ❌ HAPUS INI
// const { User } = require('./database/mongoose-schemas');

// ✅ GANTI JADI INI
const User = require('./models/User');

// ✅ LOAD ENV
dotenv.config();

// ✅ CONNECT DATABASE
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ STATIC FILE (UPLOADS)
app.use('/uploads', express.static('uploads'));

// ================= ROUTES =================

// ✅ BASIC ROUTE
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ✅ STATUS CHECK
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'GearShare backend is running' });
});

// ✅ USER ROUTE
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= FEATURE ROUTES =================

// ✅ IMPORT ROUTES
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ USE ROUTES
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// ================= START SERVER =================
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});