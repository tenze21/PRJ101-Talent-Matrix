const controller = require("../controllers/project.js");
const express = require("express");
const router = express.Router();
//create client

// router.post("/create_clients", controller.createClient);
// router.get("/get_clients", controller.getAllClients);

router.post("/create_project/:email", controller.create_project);

router.get("/get_project_email/:email", controller.get_project_email);

// router.get("/delete_client/:email", controller.delete_client);

// router.post("/update_profile/:email", controller.update_profile);

// router.post("/upload_profile_client_img", upload.single("image"), controller.update_profile_img);

module.exports = router;
