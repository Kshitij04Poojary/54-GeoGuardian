const User = require('../models/usersModel');
const smsService = require('../utils/smsService');

exports.broadcastMessage = async (req, res) => {
    try {
        // Generate the message
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        // Fetch all users with phone numbers
        const users = await User.find({}, 'phone');
        const phoneNumbers = users.map(user => user.phone);

        // Send SMS to all users
        await smsService.sendBulkSMS(phoneNumbers, message);

        res.status(200).json({ success: true, message: 'Message broadcasted successfully!' });
    } catch (error) {
        console.error('Error broadcasting message:', error);
        res.status(500).json({ error: 'Failed to broadcast message' });
    }
};
