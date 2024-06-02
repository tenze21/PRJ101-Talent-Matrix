const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Define routes
router.post("/create_user", userController.createUser);

router.post("/login_user", userController.loginUser);



module.exports = router;
