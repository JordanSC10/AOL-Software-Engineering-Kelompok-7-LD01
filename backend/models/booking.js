const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: String,
  equipmentId: String,

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