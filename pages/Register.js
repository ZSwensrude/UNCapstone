import { Typography } from "@mui/material";
import React from "react";
import './Register.css';

// Placeholder for Dias screen
const Register = () => {
  return (
    
        <div className="regContainer">
            <h1 className="regHeader1">Register</h1>
            <div className="inputRegister">
                <h6 className="regHeader6">Username</h6> 
                <input className="inputBoxRegister" type="text" required />
            </div>
            <div className="inputRegister">
                <h6 className="regHeader6">Password</h6>
                <input className="inputBoxRegister" type="password" required />
            </div>
            <div className="inputRegister">
                <h6 className="regHeader6">Re-Enter Password</h6>
                <input className="inputBoxRegister" type="password" required />
            </div>
            <button className="buttonRegister" type="submit">Create Account</button>
        </div>
    
  );
}


export default Register;
