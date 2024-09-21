const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');

// Generate a queue number
router.post('/generate', async (req, res) => {
  try {
    const lastQueue = await Queue.findOne().sort({ queueNumber: -1 });
    const newQueueNumber = lastQueue ? lastQueue.queueNumber + 1 : 1;

    const newQueue = new Queue({ queueNumber: newQueueNumber });
    await newQueue.save();

    res.status(201).json({ queueNumber: newQueueNumber });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
