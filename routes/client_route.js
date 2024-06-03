const express = require("express");
const router = express.Router();
const controller = require("../controllers/client");

//create client

// router.post("/create_clients", controller.createClient);
router.get("/get_clients", controller.getAllClients);

router.get("/get_client_email/:email", controller.get_client_email);

router.get("/get_profile_email/:email", controller.get_profile_email);

router.get("/delete_client/:email", controller.delete_client);

router.post("/update_profile/:email", controller.update_profile);

module.exports = router;
