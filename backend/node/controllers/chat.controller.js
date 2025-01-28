const User = require('./models/User');

app.get('/search-users', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        // Search by email, phone, or userType
        const users = await User.find({
            $or: [
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { userType: { $regex: query, $options: 'i' } }
            ]
        }).select('email phone userType');

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
