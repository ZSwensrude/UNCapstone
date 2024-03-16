import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import '../pages/presentation.css';
import flagsData from '../flags.json';
import { Paper, Typography } from "@mui/material";
import { conferenceCollection } from "../imports/api/conference";

const CurrentSpeaker = ({ confCode }) => {
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const user = getUserFromLocalStorage();

  const [speakers, setSpeakers] = useState([]);
  const [countryObject, setCountryObject] = useState({});

  // Fetch speakers using useTracker hook
  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne({ sessionID: user.confID });
    if (data)
      setSpeakers(data.speakers?.sort((a, b) => a.createdAt - b.createdAt));
  }, []);

  useEffect(() => {
    if (speakers.length > 0) {
      setCountryObject(flagsData.countries.find(country => country.country === speakers[0].country));
    } else {
      setCountryObject({});
    }
  }, [speakers]);

  return (
    <div className="presentationCountry" >
      <Paper id="presentationPaper">
        <Typography variant="h4" >Current Speaker</Typography>
      </Paper>
      {Object.keys(countryObject).length !== 0 && (
        <>
          <Typography variant="h1">{countryObject.name}</Typography>
          <img id="presentationFlag" src={window.location.origin + countryObject.flagPath} alt={`Flag of ${countryObject.country}`} title={countryObject.name} />
        </>
      )}
      <div id='confID' >
        <Typography variant="h1" >Conference code:</Typography>
        <Typography variant="h1" >{confCode}</Typography>
      </div>
    </div>
  );
};

export default CurrentSpeaker;