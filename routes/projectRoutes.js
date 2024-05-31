const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.createProject);
router.put('/:id/complete', ProjectController.markAsDone);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
