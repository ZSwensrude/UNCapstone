import { Typography } from "@mui/material";
import React from "react";
import './Register.css';

// Placeholder for Dias screen
const Register = () => {
  return (
    
        <div className="regContainer">
            <h1>Register</h1>
            <div className="enterUsername">
                <h6>Username</h6> 
                <div className="inputBoxRegister">
                    <input type="text" required />
                </div>
            </div>
            <div className="enterPassword">
                <h6>Password</h6>
                <div className="inputBoxRegister">
                    <input type="password" required />
                </div>
            </div>
            <div className="enterPassword">
                <h6>Re-Enter Password</h6>
                <div className="inputBoxRegister">
                    <input type="password" required />
                </div>
            </div>
        </div>
    
  );
}


export default Register;
