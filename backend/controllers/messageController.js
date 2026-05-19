const Message = require('../models/Message');

// ✅ SEND MESSAGE
const sendMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;

    const message = new Message({
      conversationId,
      sender,
      text
    });

    await message.save();

    res.status(201).json({
      success: true,
      data: message
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

// ✅ GET MESSAGES BY CONVERSATION
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const messages = await Message.find({ conversationId })
      .populate('sender', 'username email'); // nampilin info sender biar gak cuma ID

    res.status(200).json({
      success: true,
      messages: messages
    });

  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

module.exports = {
  sendMessage,
  getMessages
};