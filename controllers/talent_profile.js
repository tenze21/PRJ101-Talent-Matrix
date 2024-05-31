const Talent = require('../model/talent_profileModel');

// Get all talents
exports.getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.status(200).json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new talent
exports.createTalent = async (req, res) => {
  const talent = new Talent(req.body);
  try {
    const newTalent = await talent.save();
    res.status(201).json(newTalent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get talent by ID
exports.getTalentById = async (req, res) => {
  try {
    const talent = await Talent.findById(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });
    res.status(200).json(talent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update talent
exports.updateTalent = async (req, res) => {
  try {
    const updatedTalent = await Talent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTalent) return res.status(404).json({ message: 'Talent not found' });
    res.status(200).json(updatedTalent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete talent
exports.deleteTalent = async (req, res) => {
  try {
    const talent = await Talent.findById(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });
    await talent.remove();
    res.status(200).json({ message: 'Talent deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
