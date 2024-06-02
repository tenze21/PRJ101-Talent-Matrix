const express = require("express");
const router = express.Router();
const controller = require("../controllers/client");

//create client

// router.post("/create_clients", controller.createClient);
router.get("/get_clients", controller.getAllClients);

router.get("/get_client_email/:email", controller.get_client_email);

module.exports = router;
