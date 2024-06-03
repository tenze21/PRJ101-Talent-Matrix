const Project = require("../model/project_model");

exports.create_project = async (req, res) => {
  try {
    console.log("here");
    const project = new Project(req.body);
    // console.log(user);
    const result = await project.save();
    console.log(result);
    console.log("created sucessfully");

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.get_project_email = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const project = await Project.find({ client_email: email });
    console.log(project); // Assuming status is a property of the User model
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
