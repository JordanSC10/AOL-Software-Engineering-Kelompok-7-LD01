const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // ✅ BIAYA SEWA
  amount: {
    type: Number,
    default: 0
  },

  // ✅ JAMINAN / DEPOSIT
  deposit: {
    type: Number,
    default: 0
  },

  // ✅ TOTAL PEMBAYARAN
  total: {
    type: Number,
    default: 0
  },

  // ✅ METODE PEMBAYARAN
  method: {
    type: String,
    enum: ['transfer', 'qris', 'cod'],
    default: 'transfer'
  },

  // ✅ BUKTI PEMBAYARAN
  proof: {
    type: String,
    default: null
  },

  // ✅ QR OWNER (OPTIONAL)
  ownerQR: {
    type: String,
    default: null
  },

  // ✅ TEMPAT COD (OPTIONAL)
  codLocation: {
    type: String,
    default: null
  },

  // ✅ STATUS PAYMENT
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'refunded'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);