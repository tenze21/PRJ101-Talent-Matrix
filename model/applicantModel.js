// models/
const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cid: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'approved'],
    default: 'pending',
  },
});

module.exports = mongoose.model('applicant', TalentSchema);
