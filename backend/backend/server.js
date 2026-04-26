// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

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
const equipmentRoutes = require('./routes/equipmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');   // 🔥 TAMBAH
const verifyRoutes = require('./routes/verifyRoutes');   // 🔥 TAMBAH

// ✅ USE ROUTES
app.use('/api/payments', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/review', reviewRoutes);   // 🔥 TAMBAH
app.use('/api/verify', verifyRoutes);   // 🔥 TAMBAH

// ================= START SERVER =================
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});