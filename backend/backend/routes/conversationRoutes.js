const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversationController');

// ✅ CREATE CONVERSATION
router.post('/', conversationController.createConversation);

// ✅ GET USER CONVERSATIONS
router.get('/:userId', conversationController.getUserConversations);

module.exports = router;