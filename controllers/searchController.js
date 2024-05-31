const Talent = require('../model/seaechModel');

// Controller methods
exports.getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.json(talents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Implement other controller methods as needed
