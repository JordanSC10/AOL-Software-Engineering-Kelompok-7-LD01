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
};