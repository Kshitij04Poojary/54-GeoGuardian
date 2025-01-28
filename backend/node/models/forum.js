const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    userType: {
        type: String,
        enum: ['Admin', 'Organization', 'NGO', 'Citizen'],
        required: [true, "User type is required"],
    },
    message: {
        type: String,
        required: [true, "Message cannot be empty"],
        trim: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Forum', forumSchema);
