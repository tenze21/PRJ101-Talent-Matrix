const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dzongkhag: { type: String, required: true },
  region: { type: String, required: true },
  organization: { type: String, required: true },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
