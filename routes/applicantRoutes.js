// routes/Routes.js
const express = require('express');
const router = express.Router();
const {
  getAllTalents,
  getTalentsByStatus,
  createTalent,
  updateTalentStatus,
} = require('../controllers/applicantcontroller');

// Get all talents
router.get('/talents', getAllTalents);

// Get talents by status
router.get('/talents/status/:status', getTalentsByStatus);

// Create new talent
router.post('/talents', createTalent);

// Update talent status
router.put('/talents/:id/status', updateTalentStatus);

module.exports = router;
