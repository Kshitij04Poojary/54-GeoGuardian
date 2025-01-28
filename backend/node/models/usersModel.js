const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, "Email must be unique"],
        minLength: [5, "Email must have 5 characters"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        select: false,
    },
    verificationCodeValidation: {
        type: Number,
        select: false,
    },
    userType: {
        type: String,
        required: [true, "User type must be selected"],
        enum: ['Admin', 'Organization', 'NGO', 'Citizen'], // Allowed user types
        default: 'Citizen', // Default user type if none is selected
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
