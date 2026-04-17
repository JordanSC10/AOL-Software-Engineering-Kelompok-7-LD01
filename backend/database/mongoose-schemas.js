// database/mongoose-schemas.js
// Contoh schema Mongoose untuk GearShare (MongoDB)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
}, {
  timestamps: true,
});

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  description: { type: String, trim: true },
  rentalPrice: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  status: { type: String, enum: ['available', 'rented', 'maintenance'], default: 'available' },
  imageUrl: { type: String, trim: true },
}, {
  timestamps: true,
});

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  rentalStart: { type: Date, required: true },
  rentalEnd: { type: Date, required: true },
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'confirmed', 'returned', 'canceled'], default: 'pending' },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
const Equipment = mongoose.model('Equipment', equipmentSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  User,
  Equipment,
  Transaction,
};
