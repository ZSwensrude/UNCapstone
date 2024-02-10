import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import './DiasIndex.css';
import Header from "../components/Header";
import CoolButton from "../components/CoolButton";
import MyConference from "../components/MyConferences";
import { useNavigate  } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle} from "@mui/material";
import PriorLocations from "../components/PriorLocations";

// Placeholder for Dias screen
const Dias = () => {

  const navigate = useNavigate();

    const toDiasHome = () => {
        // Navigate to a different route
        navigate('/dias-home-page');
    };

    const conferenceLocations = [
        {
          "cLocation": "SA-214k"
        },
        {
            "cLocation": "Northwest Center"
        },
        {
            "cLocation": "SA-214b",
        }
      ]

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

  const [openConference, setOpenConference] = React.useState(false);
 
  const handleClickToOpenConference = () => {
      setOpenConference(true);
  };

  const handleToCloseConference = () => {
      setOpenConference(false);
  };
  
  return (
    <div className="fullPage">
        
        <Dialog open={openConference} onClose={handleToCloseConference}>
            <DialogTitle>{"Create Conference"}</DialogTitle>
            <DialogContent>
            <div className='firstPart'>
                <div className="TitleLabel">
                  <h6 className="header1">Title:</h6> 
                    <div className="inputBox">
                        <input id="conferenceTitle" type="text" required />
                    </div>
                </div>
                <div className="ComiteeLabel">
                  <h6 className="header1">Commitee:</h6> 
                  <div className="inputBox">
                    <input id="conferenceCommitee" type="text" required />
                  </div>
                </div>
                <div className='smallLineBox'>
                  <div className="smallLine"></div>
                </div>
            </div>

            <div className='secondPart'>

                    <div className='PresetLocationsTitleBlock'>
                        <div className='title2'>Preset Locations</div>       
                    </div>

                    <div className="locationBoxBlock">
                        <div className='locationBox'>

                            <div className="locationInputBox">
                                <input className="locationInput" placeholder="type here..." type="text" />
                            </div>

                            <div className='addButtonBox'>
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                            </div>

                            <div className='smallerLineBox'>
                                <div className="smallerLine"></div>
                            </div>

                            {conferenceLocations.map( (conferenceLocation, index) => (
                            <PriorLocations key={conferenceLocation.cLocation + index} version={"dias"} conferenceLocation={conferenceLocation}/>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='thirdPart'>
                    <div className='smallLineBox'>
                        <div className="smallLine"></div>
                    </div>
                    <div className='createConfButtons'>
                        <CoolButton buttonText={"Cancel"} onClick={handleToCloseConference} buttonColor={'#800000'} textColor='white' />
                        <CoolButton buttonText={"Create"} onClick={toDiasHome} buttonColor={'#FF9728'} textColor='white' />
                    </div>
                </div>

              
            </DialogContent>
        </Dialog>
        
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
              <CoolButton buttonText={"New"} onClick={handleClickToOpenConference} buttonColor={'#FF9728'} textColor='white' />
              </div>
            </div>
            
          </div>
        </div>

    </div>
  );
}

export default Dias;
