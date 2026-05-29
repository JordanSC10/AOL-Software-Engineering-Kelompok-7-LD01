// database/mongoose-schemas.js
const mongoose = require('mongoose');

// --- 1. USER SCHEMA ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  profilePicture: { type: String, default: '' }
}, {
  timestamps: true,
});

// --- 2. GEAR SCHEMA ---
const gearSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  description: { type: String, trim: true },
  rentalPrice: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  // Status diubah untuk merepresentasikan visibilitas listing
  listingStatus: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' }, 
  imageUrl: { type: String, trim: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
});

// Menambahkan index untuk pencarian alat yang aktif
gearSchema.index({ listingStatus: 1, category: 1 }); 

// --- 3. TRANSACTION SCHEMA ---
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gear', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  rentalStart: { type: Date, required: true },
  rentalEnd: { type: Date, required: true },
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'confirmed', 'returned', 'canceled'], default: 'pending' },
}, {
  timestamps: true,
});

// Index tambahan untuk mempercepat query history transaksi
transactionSchema.index({ userId: 1, status: 1 });
transactionSchema.index({ gearId: 1 });

// --- 4. CONVERSATION SCHEMA ---
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  gearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gear' }, 
  lastMessage: {
    text: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now }
  }
}, { timestamps: true });

conversationSchema.index({ participants: 1 }); 

// --- 5. MESSAGE SCHEMA ---
const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

messageSchema.index({ conversationId: 1, createdAt: 1 }); 

// Model Exports
const User = mongoose.model('User', userSchema);
const Gear = mongoose.model('Gear', gearSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { User, Gear, Transaction, Conversation, Message };