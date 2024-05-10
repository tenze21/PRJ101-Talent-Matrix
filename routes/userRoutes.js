const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// User registration route
router.post("/register", UserController.registerUser);

// User login route
router.post("/login", UserController.loginUser);

// Get all users route
router.get("/", UserController.getAllUsers);

// is To gft specific user using id
router.get('/:userId', UserController.getUserById);

// Delete specific user by ID route
router.delete('/:userId', UserController.deleteUserById)

// Update specific user route
router.put('/:userId', UserController.updateUser);

module.exports = router;
