const express = require('express');
const router = express.Router();
const ongoingProjectsController = require('../controllers/ongoingProjectsController');

// Route for displaying ongoing projects
router.get('/', ongoingProjectsController.getOngoingProjects);

module.exports = router;
