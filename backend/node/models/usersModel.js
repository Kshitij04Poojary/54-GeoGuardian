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
        enum: ['Admin', 'Organization', 'NGO', 'Citizen'],
        default: 'Citizen',
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: [true, "Phone number must be unique"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username cannot exceed 20 characters"],
    },
    documents: {
        document1: {
            type: String,
            default: null // Will store the file name of the uploaded document
        },
        document2: {
            type: String,
            default: null // Will store the file name of the uploaded document
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
