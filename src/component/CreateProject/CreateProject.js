import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css';
import hero from './hero.svg';
import vector from './Vector.svg';
import ProjectModal from './ProjectPropComp/ProjectModal';
import { toast } from "react-toastify";
import {config} from "../../App";
import axios from "axios";

const CreateProject = () => {
  const [showProjectPrompt, setShowProjectPrompt] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowProjectPrompt(true);
  };

  const handleCloseProjectPrompt = async() => {
    await fetchProjectData()
    setShowProjectPrompt(false);
  };

  const handleCardClick = (projectName) => {
    navigate(`/${projectName}/upload`);
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        `${config.endpoint}/project`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }
        }
      );

      setProjects(response.data)
      toast.success("Successfully Fetch Data", 3000);
    } catch (error) {
      toast.error(error.response.data.message, 3000);
    }
  };

  useEffect(() => {
    fetchProjectData()
  }, [])

  return (
    <div className='hero-container'>
      {projects.length === 0 ? (
        <>
          <div className='heading'>Create a New Project</div>
          <div className='hero-image'>
            <img src={hero} alt="Hero" />
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          </p>
          <button className='button1' onClick={handleButtonClick}>
            <img src={vector} alt="Vector Icon" />
            Create New Project
          </button>
        </>
      ) : (
        <div className='projects-container'>
          <div className='projects-header'>
            <h2>Projects</h2>
            <button className='button1' onClick={handleButtonClick}>
              <img src={vector} alt="Vector Icon" />
              Create New Project
            </button>
          </div>
          <div className='projects-grid'>
            {projects.map((project, index) => (
              <div 
                key={index} 
                className='project-card'
                onClick={() => handleCardClick(project.title)}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {showProjectPrompt && <ProjectModal onClose={handleCloseProjectPrompt} isOpen={showProjectPrompt}/>}
    </div>
  );
};

export default CreateProject;
