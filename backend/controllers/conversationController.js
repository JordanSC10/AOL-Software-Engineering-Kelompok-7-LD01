const Conversation = require('../models/Conversation');

// ✅ CREATE CONVERSATION
const createConversation = async (req, res) => {
  try {
    const { renterId, ownerId, equipmentId } = req.body;

    // Cek dulu apakah percakapan untuk barang ini sudah ada antara kedua user ini
    let conversation = await Conversation.findOne({
      renterId,
      ownerId,
      equipmentId
    });

    if (!conversation) {
      conversation = new Conversation({
        renterId,
        ownerId,
        equipmentId
      });
      await conversation.save();
    }

    res.status(201).json({
      success: true,
      data: conversation
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ GET USER CONVERSATIONS
const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({
      $or: [
        { renterId: userId },
        { ownerId: userId }
      ]
    })
      .populate('renterId', 'username email')
      .populate('ownerId', 'username email')
      .populate('equipmentId', 'name price image');

    res.status(200).json({
      success: true,
      conversations
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createConversation,
  getUserConversations
};