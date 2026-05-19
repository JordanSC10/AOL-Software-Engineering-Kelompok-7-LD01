const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const dotenv = require('dotenv');
const connectDB = require('./db');

const User = require('./models/User');

// ================= ENV =================

dotenv.config();

// ================= DB =================

connectDB();

// ================= APP =================

const app = express();

const server = http.createServer(app);

// ================= SOCKET.IO =================

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ================= PORT =================

const port = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/uploads', express.static('uploads'));

// ================= SOCKET EVENTS =================

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  const handleJoinRoom = (conversationId) => {
    if (!conversationId) return;

    socket.join(conversationId);

    console.log(`Joined room: ${conversationId}`);
  };

  socket.on('joinConversation', handleJoinRoom);
  socket.on('join_room', handleJoinRoom);

  const handleSendMessage = (message) => {
    const room = message?.conversationId || message?.room;

    if (!room) return;

    io.to(room).emit('receive_message', message);
    io.to(room).emit('message', message);
  };

  socket.on('sendMessage', handleSendMessage);
  socket.on('send_message', handleSendMessage);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// ================= BASIC ROUTES =================

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'GearShare backend is running'
  });
});

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

const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const verifyRoutes = require('./routes/verifyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/api/payments', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/conversation', conversationRoutes);

// ================= START =================

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});