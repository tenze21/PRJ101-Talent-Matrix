// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectID: { type: Number, required: true },
  projectTitle: { type: String, required: true },
  clientID: { type: Number, required: true },
  clientName: { type: String, required: true },
  hires: { type: [String], required: true },
  payment: { type: Number, required: true },
  status: { type: String, required: true, enum: ['New', 'Completed'] },
});

module.exports = mongoose.model('Project', ProjectSchema);
