const User = require("../model/user_model");
const cookieParser = require("cookie-parser");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user);
    const result = await user.save();
    console.log(result);
    console.log("created sucessfully");

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    console.log(email, password);

    // Find the user by email
    const user_info = await User.findOne({ email });
    console.log(user_info.role);

    if (user_info.password == password) {
      console.log("login sucessfull");
      // Set a cookie with the user's email
      res.cookie("user_email", decodeURIComponent(email));
    } else {
      console.log("login not sucessful");
      // res.status(500).json({ error: "check your email or password" });
      // return;
    }

    res.status(200).json({
      message: "Login successful",
      userType: user_info.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
