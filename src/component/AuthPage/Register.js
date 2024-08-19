import "./index.css";
import { TextField, Button, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import {config} from "../../App";


export default function Register ({ setStep }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    // Function to handle user registration
    const registerUser = async () => {
      try {
        // Send a POST request to register the user
        await axios.post(`${config.endpoint}/users/register`, {
          username,
          email,
          password,
        });
  
        // Show a success toast message
        toast.success("Successfully Registered", 3000);
        setStep("login")
      } catch (error) {
        // Show an error toast message
        toast.error("Something went wrong", 3000);
      }
    };

    return (
        <div className="login-container">
            <TextField className="input-field" label="username" onChange={(event) => setUsername(event.target.value)}/>
            <TextField className="input-field" label="email" onChange={(event) => setEmail(event.target.value)}/>
            <TextField className="input-field" label="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
            <Button className="login-button" variant="contained" onClick={() => registerUser()}>Register</Button>
            <div className="divider-container">
                <Divider className="divider"/>
                <span>OR</span>
                <Divider className="divider"/>
            </div>
            <div className="create-account-text">I already have an Account ? <Button className="create-account" onClick={() => setStep("login")}>Sign In</Button></div>
        </div>
    )
    
}