const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  }

}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);