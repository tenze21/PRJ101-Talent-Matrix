const express = require('express');
const router = express.Router();
const hireRequestController = require('../controllers/hire_requestController');

// Index route
router.get('/hire-requests', hireRequestController.index);

// Other routes for CRUD operations can be defined here

module.exports = router;
