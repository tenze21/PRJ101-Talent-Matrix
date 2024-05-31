const mongoose = require('mongoose');

const hireRequestSchema = new mongoose.Schema({
  clientName: String,
  projectTitle: String,
  projectDescription: String,
  scopeDuration: String,
  skills: [String],
  payment: String,
});

const HireRequest = mongoose.model('HireRequest', hireRequestSchema);

module.exports = HireRequest;
