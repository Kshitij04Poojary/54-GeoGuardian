const mongoose = require('mongoose');

// Volunteer schema for nested documents
const volunteerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Volunteer name is required"],
        trim: true
    },
    age: {
        type: Number,
        required: [true, "Volunteer age is required"],
        min: [18, "Volunteers must be at least 18 years old"]
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, "Gender is required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },
    additionalInfo: {
        type: String,
        trim: true
    }
});

// NGO Dashboard schema
const ngoDashboardSchema = mongoose.Schema({
    currentAffectedAreas: {
        type: [String], // List of affected areas
        default: []
    },
    activeReliefOperations: {
        type: [String], // List of active operations
        default: []
    },
    recoveredAreas: {
        type: [String], // List of recovered areas
        default: []
    },
    availableFunds: {
        type: Number,
        required: [true, "Available funds must be specified"],
        default: 0
    },
    resourcesDeployed: {
        type: Number,
        default: 0 // Count of resources deployed
    },
    resourcesNeeded: {
        type: Number,
        default: 0 // Count of resources needed
    },
    date: {
        type: Date,
        default: Date.now
    },
    volunteers: {
        type: [volunteerSchema],
        default: []
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('NGODashboard', ngoDashboardSchema);
