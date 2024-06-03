const User = require("../model/user_model");

exports.get_talent = async (req, res) => {
  try {
    const talents = await User.find({ status: "pending", role: "talent" }); // Assuming status is a property of the User model
    res.status(200).json(talents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_talent_short = async (req, res) => {
  try {
    const talents = await User.find({ status: "short", role: "talent" });
    console.log(talents); // Assuming status is a property of the User model
    res.status(200).json(talents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.loginUser = async (req, res) => {
//   try {
//     // Extract email and password from request body
//     const { email, password } = req.body;
//     console.log(email, password);

//     // Find the user by email
//     const user_info = await User.findOne({ email });
//     console.log(user_info.role);

//     if (user_info.password == password) {
//       console.log("login sucessfull");
//     } else {
//       console.log("login not sucessful");
//     }

//     res.status(200).json({
//       message: "Login successful",
//       userType: user_info.role,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
