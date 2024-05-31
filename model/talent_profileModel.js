const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  location: {
    city: String,
    area: String
  },
  experience: { type: String, required: true },
  skills: [String],
  education: {
    school: String,
    field_of_study: String,
    date_from: String,
    date_to: String
  },
  employment: {
    title: String,
    company: String,
    from: String,
    to: String
  },
  about: { type: String },
  social_media: {
    facebook: String,
    twitter: String,
    linkedin: String
  }
});

module.exports = mongoose.model('Talents', TalentSchema);
