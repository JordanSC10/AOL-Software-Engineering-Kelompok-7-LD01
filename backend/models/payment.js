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
  amount: Number,   // biaya sewa
  deposit: Number,  // jaminan
  total: Number,    // amount + deposit

  method: {
    type: String,
    default: 'transfer'
  },

  proof: String, // URL / filename bukti transfer

  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);