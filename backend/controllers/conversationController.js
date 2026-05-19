<<<<<<< HEAD
const Conversation = require('../models/Conversation');

// ✅ CREATE CONVERSATION
exports.createConversation = async (req, res) => {
  try {
    const conversation = new Conversation(req.body);

    await conversation.save();

    res.status(201).json(conversation);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET USER CONVERSATIONS
exports.getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { renterId: req.params.userId },
        { ownerId: req.params.userId }
      ]
    })
      .populate('renterId')
      .populate('ownerId')
      .populate('equipmentId');

    res.json(conversations);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
=======
const createConversation = async (req, res) => {
  try {
    const { members } = req.body;

    res.status(200).json({
      success: true,
      message: "Conversation created",
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    res.status(200).json({
      success: true,
      userId,
      conversations: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createConversation,
  getUserConversations,
>>>>>>> bc9fa8e7 (Update features)
};