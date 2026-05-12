const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// ✅ SEND MESSAGE
router.post('/', messageController.sendMessage);

// ✅ GET MESSAGE HISTORY
router.get('/:conversationId', messageController.getMessages);

module.exports = router;