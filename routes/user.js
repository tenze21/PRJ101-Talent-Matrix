const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const multer = require("multer");
const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10 MB
  },
});

// Define routes
router.post("/create_user", userController.createUser);

router.post("/login_user", userController.loginUser);

module.exports = router;
