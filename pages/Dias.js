import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import './DiasIndex.css';
import Header from "../components/Header";
import CoolButton from "../components/CoolButton";
import CreateConference from "../components/Create Conference/CreateConference";

// Placeholder for Dias screen
const Dias = () => {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="fullPage">
        {openModal && <CreateConference closeModal={setOpenModal}/>}
        
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
            <CoolButton buttonText={"New"} onClick={() => {setOpenModal(true);}} buttonColor={'#FF9728'} textColor='white' />
            </div>
            
          </div>
        </div>

    </div>
  );
}

export default Dias;
