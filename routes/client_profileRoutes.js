const express = require("express");
const router = express.Router();
const controller = require("../controllers/client_profileController");

// Create a new client
router.post("/clients", controller.createClient);

// Get a client by ID
router.get("/clients/:userId", controller.getClientById);

// Update a client
router.put("/clients/:userId", controller.updateClient);

// Delete a client
router.delete("/clients/:userId", controller.deleteClient);

module.exports = router;
