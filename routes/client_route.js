const express = require("express");
const router = express.Router();
const controller = require("../controllers/client");

//create client

// router.post("/create_clients", controller.createClient);
router.get("/get_clients", controller.getAllClients);

module.exports = router;
