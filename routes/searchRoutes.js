const express = require('express');
const talentController = require('../controllers/searchController');

const router = express.Router();

router.get('/talents', talentController.getAllTalents);
// Define other routes as needed

module.exports = router;
