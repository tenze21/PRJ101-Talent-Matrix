// models/Talent.js
const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  image: String,
  location: {
    city: String,
    country: String
  },
  skills: [String]
});

module.exports = mongoose.model('Talent', talentSchema);
