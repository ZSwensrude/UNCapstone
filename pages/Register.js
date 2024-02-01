import React from "react";
import './Register.css';
import { RegisterForm } from "../components/RegisterForm";
import Header from "../components/Header";

// Placeholder for Dias screen
const Register = () => {
  return (
    <div>
      <Header version={'blank'}/>
      <RegisterForm />
    </div>
  );
}


export default Register;
