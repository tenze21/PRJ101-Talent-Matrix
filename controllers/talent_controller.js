const User = require("../model/user_model");

exports.update_talent = async (req, res) => {
  try {
    console.log("here");
    const email = req.params.email;
    const updateData = req.body;

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
