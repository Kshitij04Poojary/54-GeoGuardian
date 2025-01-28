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
        // required: [true, "User type must be selected"],
        enum: ['Admin', 'Organization', 'NGO', 'Citizen'], // Allowed user types
        default: 'Citizen',
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: [true, "Phone number must be unique"],
        // validate: {
        //     validator: function (v) {
        //         return /^\d{10}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // },
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
