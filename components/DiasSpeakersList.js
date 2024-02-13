import React from 'react';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';
import Country from './Country';
import { speakerCollection, insertSpeaker } from '../imports/api/speakers';
import { useTracker } from 'meteor/react-meteor-data';

const DiasSpeakersList = () => {
  
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();

  // Use useTracker to reactively fetch data from the speakers collection
  const { speakers } = useTracker(() => {
    const handler = Meteor.subscribe('speakers');
    const speakersData = speakerCollection.find({}, { sort: { createdAt: 1 } }).fetch(); // Sort by createdAt in ascending order
    return { speakers: speakersData };
  });

  const currentSpeaker = speakers.length > 0 ? speakers[0] : {};

  const onClick = () => {
    if (user && user.country) {
      console.log("added to speaker DB:", user.country);
      insertSpeaker({ country: user.country });
    } else {
      console.error("User or country is undefined.");
    }
  };

    // Check if the user's country is in the speakers list
    const isUserInQueue = speakers.some(speaker => speaker.country === user?.country);
  return (
    <div id='diasspeakers'>
        <div className="controlTitleBlock">
            <div h2 className="controlTitle">Currently Speaking:</div>
        </div>        
        <div className='diasSpeakerfirst' id='speakersListCountry'>
          {Object.keys(currentSpeaker).length > 0 && (
            <Country countryName={currentSpeaker.country } />
          )}
        </div>
        <div className="lineABlock">
            <div className="lineA"></div>
        </div>
        <div className="controlTitleBlock">
            <div h2 className="controlTitle">In Queue:</div>
        </div>
        <div className="queuebox" id="speakersListCountry">
        {speakers.slice(1).map((speaker, index) => (
          <Country key={speaker._id} countryName={speaker.country} position={index + 2} showclose={true} />
        ))}

        </div>

        <div className="lineABlock">
            <div className="lineA"></div>
        </div>

    </div>
  );
};

export default DiasSpeakersList;


