import { Typography } from "@mui/material";
import React from "react";
import './DiasIndex.css';

// Placeholder for Dias screen
const Dias = () => {
  return (
    <div className="fullPage">
        <div className="bar">
        </div>
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
                <button className="newButton" type="submit">New</button>
            </div>
          </div>
        </div>

    </div>
  );
}

export default Dias;
