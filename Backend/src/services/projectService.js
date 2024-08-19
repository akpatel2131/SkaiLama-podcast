const Project = require("../model/Project");

const createProjectData = async (data) => {
  try {
    const responseData = await Project.create(data);
    return responseData;
  } catch (error) {
    throw error;
  }
};

const getAllProjectst = async (userId) => {
  try {
    console.log({userId})
    const fetchAllData = await Project.find({ userId });
    return fetchAllData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProjectData,
  getAllProjectst,
};
