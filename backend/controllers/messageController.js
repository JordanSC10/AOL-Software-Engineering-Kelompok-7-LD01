<<<<<<< HEAD
const Message = require('../models/Message');

// ✅ SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);

    await message.save();

    res.status(201).json(message);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET MESSAGES BY CONVERSATION
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).populate('senderId');

    res.json(messages);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
=======
const sendMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;

    // temporary response
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: {
        conversationId,
        sender,
        text,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // temporary response
    res.status(200).json({
      success: true,
      conversationId,
      messages: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
>>>>>>> bc9fa8e7 (Update features)
};