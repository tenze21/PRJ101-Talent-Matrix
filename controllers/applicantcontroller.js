// controllers/talentController.js
const Talent = require('../model/applicantModel');

// Get all talents
exports.getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.status(200).json(talents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get talents by status
exports.getTalentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const talents = await Talent.find({ status });
    res.status(200).json(talents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new talent
exports.createTalent = async (req, res) => {
  try {
    const newTalent = new Talent(req.body);
    await newTalent.save();
    res.status(201).json(newTalent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update talent status
exports.updateTalentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTalent = await Talent.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedTalent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
