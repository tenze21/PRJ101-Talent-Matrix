const Project = require('../model/projectController');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  const { projectId, title, clientId, clientName, hires, payment } = req.body;
  const project = new Project({ projectId, title, clientId, clientName, hires, payment });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark project as done
exports.markAsDone = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.status = 'completed';
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.remove();
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
