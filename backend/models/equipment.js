const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  location: String,
  image: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);