// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient
} = require('../controllers/clientController');

router.route('/').get(getAllClients).post(createClient);
router.route('/:id').get(getClientById).put(updateClient).delete(deleteClient);

module.exports = router;
