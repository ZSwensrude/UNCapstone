import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import './DiasIndex.css';
import Header from "../components/Header";
import CoolButton from "../components/CoolButton";
import CreateConference from "../components/Create Conference/CreateConference";
import MyConference from "../components/MyConferences";

// Placeholder for Dias screen
const Dias = () => {

  const [openModal, setOpenModal] = useState(false)

  const conferenceGroups = [
    {
      "conferenceName": "Aimun 2024",
      "status": "Active",
      "dateCreated": "24/03/01"
    },
    {
      "conferenceName": "Mini-Mun 2024",
      "status": "Archived",
      "dateCreated": "24/03/01"
    }
  ]
  
  return (
    <div className="fullPage">
        {openModal && <CreateConference closeModal={setOpenModal}/>}
        
        <Header version={'dias'}/>

        <div className="headerBar">
            <h6 className="myConference">My Conferences</h6>
        </div>

        <div className="mainBox">
          <div className="container">

          {conferenceGroups.map( (conferenceGroup, index) => (
              <MyConference key={conferenceGroup.conferenceName + index} conferenceGroup={conferenceGroup}/>
            ))}

            <div className="lineBlock">
              <div className="line">
              </div>
            
              <div className="buttonBlock">
              <CoolButton buttonText={"New"} onClick={() => {setOpenModal(true);}} buttonColor={'#FF9728'} textColor='white' />
              </div>
            </div>
            
          </div>
        </div>

    </div>
  );
}

export default Dias;
