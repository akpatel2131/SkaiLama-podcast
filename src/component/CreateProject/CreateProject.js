import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";
import hero from "./hero.svg";
import vector from "./Vector.svg";
import ProjectModal from "./ProjectPropComp/ProjectModal";
import { toast } from "react-toastify";
import { config } from "../../App";
import axios from "axios";

const colorPallate = ["#75042d", "#ed801a", "#e8ab10", "#047528", "#044275", "#400475", "#75045f"]

const CreateProject = () => {
  const [showProjectPrompt, setShowProjectPrompt] = useState(false);
  const [projects, setProjects] = useState([]);
  const [updatedDate, setUpdatedDate] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowProjectPrompt(true);
  };

  const handleCloseProjectPrompt = async () => {
    await fetchProjectData();
    setShowProjectPrompt(false);
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${config.endpoint}/project`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setProjects(response.data);
      setUpdatedDate(response.data.updatedDate)
      toast.success("Successfully Fetch Data", 3000);
    } catch (error) {
      toast.error(error.response.data.message, 3000);
    }
  };

  const findWords = (title) => {
    const array = title.split(" ");

    if(array.length === 1) {
      return `${array[0][0]}`
    }
    return `${array[0][0]}${array[1][0]}`;
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <div className="hero-container">
      {projects.length === 0 ? (
        <>
          <div className="heading">Create a New Project</div>
          <div className="hero-image">
            <img src={hero} alt="Hero" />
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>
          <button className="button1" onClick={handleButtonClick}>
            <img src={vector} alt="Vector Icon" />
            Create New Project
          </button>
        </>
      ) : (
        <div className="projects-container">
          <div className="projects-header">
            <h2>Projects</h2>
            <button className="button1" onClick={handleButtonClick}>
              <img src={vector} alt="Vector Icon" />
              Create New Project
            </button>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
              >
                <div className="keywords-image" style={{ backgroundColor: `${colorPallate[Math.floor(Math.random() * colorPallate.length)]}`}}>{findWords(project.title)}</div>
                <div className="project-info-container">
                  <div className="project-info-title">{project.title}</div>
                  <div className="project-info-subtitle">{project.episodes.length} Episodes</div>
                  <div className="project-info-date">Last Updated Date: {project.updatedDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showProjectPrompt && (
        <ProjectModal
          onClose={handleCloseProjectPrompt}
          isOpen={showProjectPrompt}
        />
      )}
    </div>
  );
};

export default CreateProject;
