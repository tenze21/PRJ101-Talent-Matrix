// routes/talentRoutes.js
const express = require('express');
const talentController = require('../controllers/talentController');

const router = express.Router();

router.get('/talents', talentController.getAllTalents);

module.exports = router;
