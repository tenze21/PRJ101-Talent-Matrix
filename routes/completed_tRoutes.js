const express = require('express');
const router = express.Router();
const completedProjectController = require('../controllers/completed_tController');

// Index route
router.get('/completed-projects', completedProjectController.index);

// Other routes for CRUD operations can be defined here

module.exports = router;
