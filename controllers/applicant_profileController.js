const ApplicantProfile = require('../model/applicant_profileModel');

// Get all applicant profiles
exports.getApplicantProfiles = async (req, res) => {
  try {
    const profiles = await ApplicantProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new applicant profile
exports.createApplicantProfile = async (req, res) => {
  const profile = new ApplicantProfile({
    username: req.body.username,
    address: req.body.address,
    experience: req.body.experience,
    email: req.body.email,
    expertise: req.body.expertise,
    education: req.body.education,
    employment: req.body.employment,
    about: req.body.about
  });

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an applicant profile
exports.deleteApplicantProfile = async (req, res) => {
  try {
    await ApplicantProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
