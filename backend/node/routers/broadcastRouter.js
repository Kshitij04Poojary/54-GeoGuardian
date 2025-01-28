const express = require('express');
const { broadcastMessage } = require('../controllers/broadcast');

const router = express.Router();

// Broadcast message route
router.post('/broadcast', broadcastMessage);

module.exports = router;
