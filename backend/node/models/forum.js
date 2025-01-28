const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    userType: {
        type: String,
        enum: ['Admin', 'Organization', 'NGO', 'Citizen'], // Allowed user types
        required: [true, "User type is required"],
    },
    message: {
        type: String,
        required: [true, "Message cannot be empty"],
        trim: true,
    },
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Forum', forumSchema);
