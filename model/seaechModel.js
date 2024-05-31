const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  username: String,
  address: {
    dzongkhag: String,
    country: String
  },
  skills: [String],
  // Add more fields as needed
});

const Talent = mongoose.model('search', talentSchema);

module.exports = Talent;
