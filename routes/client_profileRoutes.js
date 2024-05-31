const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client_profileController');

// Create a new client
router.post('/clients', clientController.createClient);

// Get a client by ID
router.get('/clients/:userId', clientController.getClientById);

// Update a client
router.put('/clients/:userId', clientController.updateClient);

// Delete a client
router.delete('/clients/:userId', clientController.deleteClient);

module.exports = router;
