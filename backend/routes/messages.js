const express = require('express');
const router = express.Router();
const messagesService = require('../services/messages.js');

// GET /api/messages - Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await messagesService.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// POST /api/messages - Add new message
router.post('/', async (req, res) => {
  try {
    const newMessage = {
      author: req.body.author,
      content: req.body.content,
    };

    const addedMessage = await messagesService.addMessage(newMessage);
    res.status(201).json(addedMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// POST /api/messages/reset - Reset to initial messages
router.post('/reset', async (req, res) => {
  try {
    const resetData = await messagesService.resetMessages();
    res.json({
      message: 'Messages reset successfully',
      data: resetData,
    });
  } catch (error) {
    console.error('Error resetting messages:', error);
    res.status(500).json({ error: 'Failed to reset messages' });
  }
});

module.exports = router;