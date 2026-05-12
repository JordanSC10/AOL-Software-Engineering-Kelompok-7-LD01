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
};