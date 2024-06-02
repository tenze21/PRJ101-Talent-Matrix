const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");

// get routes
router.get("/get_talents", adminController.get_talent);

// router.post("/login_user", userController.loginUser);

module.exports = router;
