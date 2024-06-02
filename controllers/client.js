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
