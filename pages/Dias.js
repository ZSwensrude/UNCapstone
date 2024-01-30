import { Typography } from "@mui/material";
import React from "react";
import './DiasIndex.css';
import Header from "../components/Header";
import { useNavigate  } from 'react-router-dom';
import CoolButton from "../components/CoolButton";

// Placeholder for Dias screen
const Dias = () => {

  const navigate = useNavigate();

  const toDiasHome = () => {
    // Navigate to a different route
    navigate('/dias-home-page');
  };

  return (
    <div className="fullPage">

        <Header version={'dias'}/>

        <div className="headerBar">
            <h6 className="myConference">My Conferences</h6>
        </div>

        <div className="mainBox">
          <div className="container">
            <div className="lineBlock">
              <div className="line">
              </div>
            </div>
            <div className="buttonBlock">
            <CoolButton buttonText={"New"} onClick={toDiasHome} buttonColor={'#FF9728'} textColor='white' />
            </div>
          </div>
        </div>

    </div>
  );
}

export default Dias;
