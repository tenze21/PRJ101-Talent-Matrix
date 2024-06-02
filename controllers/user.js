const User = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    console.log("creating client");
    const user = new User(req.body);
    console.log(user);
    await user.save();
    console.log("usersaved");
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
