const express = require('express');
const router = express.Router();
const applicantProfileController = require('../controllers/applicant_profileController'); // Note the capitalization

// Routes for applicant profiles
router.get('/as', applicantProfileController.getApplicantProfiles);
router.post('/do', applicantProfileController.createApplicantProfile);
router.delete('/:id', applicantProfileController.deleteApplicantProfile);

module.exports = router;
