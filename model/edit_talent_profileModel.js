// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  location: {
    dzongkhag: String,
    gewog: String
  },
  experience: String,
  education: {
    school: String,
    fieldOfStudy: String,
    dateAttended: String
  },
  employment: {
    title: String,
    company: String,
    duration: String
  },
  expertise: [String],
  media: {
    facebook: String,
    twitter: String,
    linkedin: String
  },
  about: String
});

module.exports = mongoose.model('edit_talent', userSchema);
