const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  },

  startDate: Date,
  endDate: Date,

  totalPrice: Number,

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);