const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const jwtSecret = process.env.JWT_SECRET; // Access JWT secret key from environment variable

module.exports = {
  async registerUser(req, res) {
    try {
      // Extract user data from request body
      const { email, password } = req.body;

      // Checking if the user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with encrypted password
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async loginUser(req, res) {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // If user not found or password does not match, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token with expiration time (e.g., 1 hour)
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "6h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getAllUsers(req, res) {
    try {
      // is to Fetch all users from the database
      const users = await User.find({}, "-password"); // Exclude the password field from the response

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.userId; // Extract user ID from request parameters

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Exclude the password field from the response
      const { password, ...userData } = user._doc;

      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async deleteUserById(req, res) {
    try {
      const userId = req.params.userId; // Extract user ID from request parameters

      // Find the user by ID and delete it
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.userId; // Extract user ID from request parameters
      const updateFields = req.body; // Extract fields to be updated from request body

      // Find the user by ID
      let user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update only the specified fields
      Object.keys(updateFields).forEach((key) => {
        if (
          key !== "_id" &&
          key !== "__v" &&
          key !== "password"
        ) {
          user[key] = updateFields[key];
        }
      });

      // Save the updated user
      user = await user.save();

      res.json({ message: "User updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
