import React, { useState } from "react";
import "./ProjectModal.css";
import { TextField, Modal, Button } from "@mui/material";
import { toast } from "react-toastify";
import { config } from "../../../App";
import axios from "axios";
import { format } from "date-fns";

const ProjectModal = ({ onClose, isOpen }) => {
  const [projectTitle, setProjectTitle] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${config.endpoint}/project`,
        {
          title: projectTitle,
          updatedDate: format(new Date(), "dd/MM/yyyy")
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Successfully Logged In", 3000);
      onClose?.();
    } catch (error) {
      toast.error(error.response.data.message, 3000);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="project-modal">
        <div className="prompt-heading">Create a New Project</div>
        <TextField
          label="Project Name"
          onChange={(e) => setProjectTitle(e.target.value)}
          className="input-field"
        />
        <div className="buttons">
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
