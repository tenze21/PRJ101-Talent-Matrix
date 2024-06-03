// controllers/clientController.js
const User = require("../model/user_model");

////////////////////////used Code/////////////////////////////////

exports.getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" });
    console.log(clients);
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.get_client_email = async (req, res) => {
  try {
    console.log("here");
    const email = req.params.email;

    // console.log(email);
    const clients = await User.find({ email: email });
    // console.log(clients);

    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_profile_email = async (req, res) => {
  try {
    console.log("here");
    const email = req.params.email;

    // console.log(email);
    const clients = await User.find({ email: email });
    // console.log(clients);

    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete_client = async (req, res) => {
  try {
    console.log("here123");
    const email = req.params.email;

    console.log(email);

    const result = await User.deleteOne({ email: email });

    if (result.deletedCount === 1) {
      console.log(`Successfully deleted user with email: ${email}`);
      res.status(200).json(clients);
    }

    console.log(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_profile = async (req, res) => {
  try {
    console.log("here123");
    const email = req.params.email;

    // console.log(req.body);
    console.log(email);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      req.body,
      { new: true } // This option returns the updated document
    );
    console.log("update sucess");
    console.log(updatedUser);

    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_profile_img = async (req, res) => {
  try {
    console.log("update profile");
    const image = req.file.buffer;
    console.log(image);
    const email = req.cookies["user_email"];

    console.log(email);
    // const user = await User.findOne({ email: email });
    const result = await User.updateOne({ email: email }, { $set: { profile_img: image } });
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    // res.status(500).json({ error: err.message });
  }
};

/////////////////////////unused code ///////////////////////

// exports.createClient = async (req, res) => {
//   try {
//     const { name, userId, dzongkhag, region } = req.body;
//     const newClient = new Client({ name, userId, dzongkhag, region });
//     await newClient.save();
//     res.status(201).json(newClient);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const { name, userId, dzongkhag, region } = req.body;
    client.name = name;
    client.userId = userId;
    client.dzongkhag = dzongkhag;
    client.region = region;

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await client.remove();
    res.status(200).json({ message: "Client removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
