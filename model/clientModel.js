// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    dzongkhag: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Clients', ClientSchema);
