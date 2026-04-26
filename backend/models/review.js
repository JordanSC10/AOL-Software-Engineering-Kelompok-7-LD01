const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: Number,
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);