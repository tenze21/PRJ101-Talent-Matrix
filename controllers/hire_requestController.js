const HireRequest = require('../model/hire_requestModel');

// Controller function to handle index route
exports.index = (req, res) => {
  HireRequest.find({}, (err, hireRequests) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(hireRequests);
    }
  });
};

// Other controller functions for CRUD operations can be added as needed
