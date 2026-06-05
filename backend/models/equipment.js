const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  location: String,
  image: String,
  whatsapp: {
    type: String,
    default: ''
  },
  bankAccount: {
    type: String,
    default: ''
  },
  bankName: {
    type: String,
    default: ''
  },
  accountNumber: {
    type: String,
    default: ''
  },
  accountHolder: {
    type: String,
    default: ''
  },
  ownerQR: {
    type: String,
    default: ''
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);
