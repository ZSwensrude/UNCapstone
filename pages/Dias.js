import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import './DiasIndex.css';
import Header from "../components/Header";
import CoolButton from "../components/CoolButton";
import MyConference from "../components/MyConferences";
import { useNavigate  } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle} from "@mui/material";
import PriorLocations from "../components/PriorLocations";
import countries from '../flags.json';
import { Accounts } from "meteor/accounts-base";
import bcrypt from 'bcryptjs';
import auth from "../components/auth";
import { insertConference } from "../imports/api/conference";

// Placeholder for Dias screen
const Dias = () => {

  const navigate = useNavigate();

  const createConference = () => {
    insertConference({sessionID: 'abc', dias: 'me', title: 'title', committee: 'UNEA'});
    
    // Navigate to a different route
    // navigate('/dias-home-page');
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
  ];

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
  
/*
Accounts.createUser(info, function(error) {

  if (Meteor.user()) {
    insertDias({ user: values.username, pass: values.password1 });
    localStorage.setItem('loggedInUser', JSON.stringify({ username: values.username, userType: 'dias' }));              navigate('/dias');
  } else {
    updateError({'error': error.reason})
  }
});

Accounts.createUser({username: 'Irelandxyz', password: 'xyz', country: 'Ireland', conference: 'xyz'})
*/

// NOTE TO BRANT !!!!!!
// I already updated this to add to the delCollection in conference db object, you just need
// to make sure you give it the right conferenceID before you initilize when making a new
// conference. you can see it hardcoded below as conferenceId
  const accounts = [];

  const initializeDB = () => {
    // update this later and give it the actual conference ID of the conference created
    const conferenceId = 'xyz';  // <-- here
    countries.countries.forEach(country => {
      let pass = bcrypt.hashSync(conferenceId, 1);

      accounts.push({
        username: `${country.country + conferenceId}`, 
        services: {
          password: {
            bcrypt: pass
          },
          resume: {
            logintokens: []
          }
        }, 
        country: country.name, 
        conference: `${conferenceId}`});
    });
    
    Meteor.call('users.createAllDelegates', accounts, conferenceId, (error, result) => {
      if (error) {
        console.error('Failed to insert users:', error);
      } else {
        //console.log('Users inserted successfully:', result);
      }
    });
  }

  useEffect (() => {auth().catch(() => {navigate("/")})}, [] );
  
  return (
    <div className="fullPage">
        
        <Dialog className="createConfDialog" open={openConference} onClose={handleToCloseConference}>
            <DialogTitle className="creatdialogtitle">{"Create Conference"}</DialogTitle>
            <DialogContent >
            <div className='firstPart'>
                <div className="Title ULabel">
                  <span className="header1">Title:</span> 
                    <div className="inputBox">
                        <input id="conferenceTitle" type="text" required />
                    </div>
                </div>
                <div className="Comitee ULabel">
                  <span className="header1">Commitee:</span> 
                  <div className="inputBox">
                    <input id="conferenceCommitee" type="text" required />
                  </div>
                </div>

            </div>

            <div className='secondPart'>

                        <span className='presetLoc'>Preset Locations</span>       

                    <div className="locationBoxBlock">
                        <div className='locationBox'>

                            <div className="locationInputBox">
                                <input className="locationInput" placeholder="type here..." type="text" />
                            </div>

                            <div className='addButtonBox'>
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                            </div>


                            {conferenceLocations.map( (conferenceLocation, index) => (
                            <PriorLocations key={conferenceLocation.cLocation + index} version={"dias"} conferenceLocation={conferenceLocation}/>
                            ))}

                        </div>
                    </div>
                </div>

                    
                    <div className='createConfButtons'>
                        <CoolButton buttonText={"Cancel"} onClick={handleToCloseConference} buttonColor={'#800000'} textColor='white' />
                        <CoolButton buttonText={"Create"} onClick={createConference} buttonColor={'#FF9728'} textColor='white' />
                    </div>
              
            </DialogContent>
        </Dialog>
        
        <Header version={'dias'}/>
          <h6 className="myConference">My Conferences</h6>

          <div className="confContainer">

          {conferenceGroups.map( (conferenceGroup, index) => (
              <MyConference key={conferenceGroup.conferenceName + index} conferenceGroup={conferenceGroup}/>
            ))}
              <div className="buttonBlock">
              <CoolButton buttonText={"New"} onClick={handleClickToOpenConference} buttonColor={'#FF9728'} textColor='white' />
              </div>
            
          </div>
          <div className="initialBtnBox">
        <CoolButton buttonText={"Initialize DB"} onClick={initializeDB}/>
        </div>

    </div>
  );
}

export default Dias;

/*

{
  "_id": {
    "$oid": "65c80f73612fa5ba59f8ece0"
  },
  "username": "Afghanistanxyz",
  "services": {
    "password": {
      "bcrypt": "$2a$10$51/89ByAXryUY2lDW4FDCOKlREuCrJFRd1xe9IU9Mo3AUoGrJiZ5e"
    }
  },
  "country": "Afghanistan",
  "conference": "xyz"
}


,
{
  "_id": "pFbxKgHMSmr7jmPcr",
  "createdAt": {
    "$date": "2024-01-31T00:07:39.909Z"
  },
  "services": {
    "password": {
      "bcrypt": "$2b$10$wgRU9yB7U2afhoJCWPHf7exYp4oFbvhuUPmP9VYUaPwkGHEuuY7PC"
    },
    "resume": {
      "loginTokens": [
        {
          "when": {
            "$date": "2024-01-31T00:07:39.914Z"
          },
          "hashedToken": "LpsnWmmdhUAbg0bScSkWn+0cc0Tt3UwE2sC6C1Hd/Lw="
        }
      ]
    }
  },
  "username": "Irelandxyz",
  "country": "Ireland",
  "conference": "xyz"
},


*/