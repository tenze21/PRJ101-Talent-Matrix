const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");

// get routes
router.get("/get_talents", adminController.get_talent);
router.get("/get_talents_short", adminController.get_talent_short);

// router.post("/login_user", userController.loginUser);

module.exports = router;
