const express = require('express');
const router = express.Router();
const applicantProfileController = require('../controllers/applicant_profileController');

// Routes for applicant profiles
router.get('/', applicantProfileController.getApplicantProfiles);
router.post('/', applicantProfileController.createApplicantProfile);
router.delete('/:id', applicantProfileController.deleteApplicantProfile);

module.exports = router;
