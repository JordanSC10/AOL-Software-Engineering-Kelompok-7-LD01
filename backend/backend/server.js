// backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const dotenv = require('dotenv');
const connectDB = require('./db');

const User = require('./models/User');

// ✅ LOAD ENV
dotenv.config();

// ✅ CONNECT DATABASE
connectDB();

const app = express();

// 🔥 HTTP SERVER (WAJIB BUAT SOCKET.IO)
const server = http.createServer(app);

// 🔥 SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const port = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

// ✅ JSON
app.use(express.json());

// ✅ STATIC FILE (UPLOADS)
app.use('/uploads', express.static('uploads'));

// ================= SOCKET =================

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // ✅ JOIN PRIVATE ROOM
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);

    console.log(`Joined room: ${conversationId}`);
  });

  // ✅ SEND MESSAGE
  socket.on('sendMessage', (message) => {
    io.to(message.conversationId).emit('message', message);
  });

  // ✅ DISCONNECT
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ================= BASIC ROUTES =================

// ✅ HOME
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ✅ STATUS CHECK
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'GearShare backend is running'
  });
});

// ✅ USERS
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ================= FEATURE ROUTES =================

// ✅ IMPORT ROUTES
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const verifyRoutes = require('./routes/verifyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

// ✅ USE ROUTES
app.use('/api/payments', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);

// ================= START SERVER =================

// ❌ JANGAN app.listen()
// ✅ PAKAI server.listen()

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});