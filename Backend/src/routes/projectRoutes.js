const express = require("express");
const route = express.Router();
const projectController = require("../controller/projectController");

const authenticateToken = require("../middleware/authenticateToken");

route.post("/", authenticateToken, projectController.createProject);
route.get("/", authenticateToken, projectController.fetchProjects);


module.exports = route;