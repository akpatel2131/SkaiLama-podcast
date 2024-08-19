const projectService = require("../services/projectService")

const createProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectData = req.body;
    projectData.userId = userId;

    const data = await projectService.createProjectData(projectData);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const fetchedData = await projectService.getAllProjectst(userId);
    res.status(200).json(fetchedData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  fetchProjects,
};
