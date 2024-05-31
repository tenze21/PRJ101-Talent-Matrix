const mongoose = require('mongoose');

const completedProjectSchema = new mongoose.Schema({
  clientName: String,
  projectTitle: String,
  projectDescription: String,
  scopeDuration: String,
  skills: [String],
  payment: String,
});

const CompletedProject = mongoose.model('CompletedProject', completedProjectSchema);

module.exports = CompletedProject;
