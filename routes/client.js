const express = require("express");
const router = express.Router();
const controller = require("../controllers/client");

//create client

router.post("/clients", controller.createClient);
