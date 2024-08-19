import { TextField, Button, Divider } from "@mui/material";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import {config} from "../../App";

export default function Login ({ setStep }) {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    // Function to handle user login
    const loginUser = async () => {
      try {
        // Send a POST request to login the user
        const response = await axios.post(
          `${config.endpoint}/users/login`,
          {
            email,
            password,
          }
        );
  
        // Store the username and auth token in local storage
        localStorage.setItem("userName", response.data.userData.username);
        localStorage.setItem("authToken", response.data.token);
        // Show a success toast message
        toast.success("Successfully Logged In", 3000);
        // Navigate to the student page
        navigate("/project");
      } catch (error) {
        // Show an error toast message
        toast.error(error.response.data.message, 3000);
      }
    };
    return (
        <div className="login-container">
            <TextField className="input-field" label="email" onChange={(event) => setEmail(event.target.value)}/>
            <TextField className="input-field" label="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
            <Button className="login-button" variant="contained" onClick={() => loginUser()}>Login</Button>
            <div className="divider-container">
                <Divider className="divider"/>
                <span>OR</span>
                <Divider className="divider"/>
            </div>
            <div className="create-account-text">Don't have any Account ? <Button className="create-account" onClick={() => setStep("register")}>Create Account</Button></div>
        </div>
    )
}