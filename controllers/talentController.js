// controllers/talentController.js
const Talent = require('../model/talentModel');

exports.getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.json(talents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
