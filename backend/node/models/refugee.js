const mongoose = require('mongoose');

const RefugeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    areaname: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    disaster: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Refugee', RefugeeSchema);
