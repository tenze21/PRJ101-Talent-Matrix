const mongoose = require('mongoose');

const applicantProfileSchema = new mongoose.Schema({
  username: String,
  address: String,
  experience: String,
  email: String,
  expertise: [String],
  education: String,
  employment: String,
  about: String
});

module.exports = mongoose.model('ApplicantProfile', applicantProfileSchema);
