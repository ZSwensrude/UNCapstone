import React from "react";
import { Typography } from "@mui/material";
import Header from "../components/Header";
import './presentation.css';

const Presentation = () => {
  return (
    <div className="presentationBody">
      <Header version={'blank'}/>
      <div className="welcomeHeader1">
        <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />
        <Typography variant="h6">Welcome to Mac-UN!</Typography>
      </div>

    </div>
  );
};

export default Presentation;
