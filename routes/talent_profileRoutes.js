const express = require('express');
const router = express.Router();
const TalentController = require('../controllers/talent_profile');

router.get('/', TalentController.getAllTalents);
router.post('/', TalentController.createTalent);
router.get('/:id', TalentController.getTalentById);
router.put('/:id', TalentController.updateTalent);
router.delete('/:id', TalentController.deleteTalent);

module.exports = router;
