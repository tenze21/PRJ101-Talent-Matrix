const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  cid: {
    type: Number, // Changed type to Number for cid
    required: false,
  },
  phone_number: {
    type: Number, // Changed type to Number for phone_number
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  portfolio_link: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  dzongkhag: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  school: {
    type: String,
    required: false,
  },
  education_date_from: {
    type: Date,
    required: false,
  },
  education_date_to: {
    type: Date,
    required: false,
  },
  field_of_study: {
    type: String,
    required: false,
  },
  expertise: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  experiences: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  ex_position: {
    type: String,
    required: false,
  },
  employment_from: {
    type: Date,
    required: false,
  },
  employment_to: {
    type: Date,
    required: false,
  },
  organisation: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["client", "talent", "admin"], // Added enum for role
    required: false,
  },
  profile_img: {
    type: Buffer, // Changed type to Buffer for profile_img
    required: false,
  },
});

module.exports = mongoose.model("Users", userSchema);

// module.exports = User;
