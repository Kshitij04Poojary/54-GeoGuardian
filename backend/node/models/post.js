const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minLength: [5, "Title must be at least 5 characters long"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minLength: [10, "Description must be at least 10 characters long"],
    },
    organizationName: {
        type: String,
        required: [true, "Organization name is required"],
        trim: true,
    },
    urgent: {
        type: Boolean,
        default: false, // Default is not urgent
    },
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Post', postSchema);
