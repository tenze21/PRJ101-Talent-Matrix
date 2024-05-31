const CompletedProject = require('../model/completed_tModel');

// Controller function to handle index route
exports.index = (req, res) => {
  CompletedProject.find({}, (err, completedProjects) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(completedProjects);
    }
  });
};

// Other controller functions for CRUD operations can be added as needed
