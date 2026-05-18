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
};