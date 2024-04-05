import React, { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';
import Country from './Country';
import { speakerCollection, insertSpeaker } from '../imports/api/speakers';
import { conferenceCollection } from '../imports/api/conference';
import { useTracker } from 'meteor/react-meteor-data';

const DiasSpeakersList = ({ confID }) => {
  
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();

  const [speakers, setSpeakers] = useState([]);
  // Use useTracker to reactively fetch data from the speakers collection
  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne({ sessionID: confID }); // Sort by createdAt in ascending order
    setSpeakers(data?.speakers?.sort((a, b) => a.createdAt - b.createdAt));
  }, []);

  const currentSpeaker = speakers?.length > 0 ? speakers[0] : {};

  const onClick = () => {
    if (user && user.country) {
      //console.log("added to speaker DB:", user.country);
      insertSpeaker({ country: user.country });
    } else {
      console.error("User or country is undefined.");
    }
  };

    // Check if the user's country is in the speakers list
    const isUserInQueue = speakers?.some(speaker => speaker.country === user?.country);
  return (
    <div id='diasspeakers'>
        <div className="controlTitleBlock">
            <h2 className="controlTitle">Currently Speaking:</h2>
        </div>        
        <div className='diasSpeakerfirst' id='speakersListCountry'>
          {Object.keys(currentSpeaker).length > 0 && (
            <Country countryName={currentSpeaker.country } />
          )}
        </div>
  
        <div className="controlTitleBlock">
            <h2 className="controlTitle">In Queue:</h2>
        </div>
        <div className="queuebox" id="speakersListCountry">
        {speakers?.slice(1).map((speaker, index) => (
          <Country key={speaker._id} countryName={speaker.country} position={index + 2} showclose={true} />
        ))}

        </div>


    </div>
  );
};

export default DiasSpeakersList;


