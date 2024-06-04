const User = require("../model/user_model");

exports.update_talent = async (req, res) => {
  try {
    console.log("update profile");
    const image = req.file.buffer;
    console.log(image);

    const email = req.params.email;
    const updateData = req.body;

    updateData.profile_img = image;

    console.log(updateData, email);

    const updatedUser = await User.updateOne({ email: email }, { $set: updateData });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_talent_pending = async (req, res) => {
  try {
    console.log("here");
    const email = req.params.email;

    console.log("email" + email);

    const updatedUser = await User.updateOne({ email: email }, { $set: { status: "short" } });

    res.status(200).json({
      message: "successfully updated",
      updatedUser: updatedUser,
    });
    console.log("update sucess status");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_talent_short = async (req, res) => {
  try {
    console.log("here");
    const email = req.params.email;

    console.log("email" + email);

    const updatedUser = await User.updateOne({ email: email }, { $set: { status: "approved" } });

    res.status(200).json({
      message: "successfully updated",
      updatedUser: updatedUser,
    });
    console.log("update sucess status");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_all_talent = async (req, res) => {
  try {
    console.log("here");
    const talents = await User.find({ role: "talent", status: "approved" });

    console.log(talents);
    res.status(200).json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.get_pro_info = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("email" + email);

    console.log("here");
    const talents = await User.find({ email: email });

    console.log(talents);
    res.status(200).json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
