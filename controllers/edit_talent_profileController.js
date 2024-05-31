// controllers/profileController.js

const User = require('../model/edit_talent_profileModel'); // Assuming you have a User model

// Handle updating user profile information
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you have userId available in params
    const updatedProfileData = req.body; // Profile data from request body

    // Update user profile in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedProfileData, { new: true });

    // Send updated user data as response
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
