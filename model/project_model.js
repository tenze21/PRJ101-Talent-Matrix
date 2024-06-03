const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  client_email: {
    type: "string",
    required: false,
  },
  talent_email: {
    type: "string",
    required: false,
  },
  project_id: {
    type: "Number",
    required: false,
  },
  hire_request: {
    type: "string",
    enum: ["pending", "accepted", "rejected"],
    required: false,
  },
  project_status: {
    type: "string",
    enum: ["ongoing", "completed"],
    required: false,
  },
  prj_title: {
    type: "string",
    required: false,
  },
  prj_description: {
    type: "string",
    required: false,
  },
  prj_scope: {
    type: "string",
    required: false,
  },
  prj_skills: {
    type: "string",
    required: false,
  },
  prj_payment: {
    type: "string",
    required: false,
  },
});

module.exports = mongoose.model("Project", projectSchema);
