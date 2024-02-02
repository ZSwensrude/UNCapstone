import React from 'react';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';
import Country from './Country';
import { speakerCollection, insertSpeaker } from '../imports/api/speakers';
import { useTracker } from 'meteor/react-meteor-data';

const SpeakersList = () => {
  
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


  return (
    <div id='speakers'>
      <Paper id='top' elevation={4}>
        <Typography variant='h4'>Speakers List</Typography>
      </Paper>
      <Paper id='body' elevation={4}>
        <Typography variant='h5'>Currently Speaking:</Typography>
        <div id='speakersListCountry'>
          {Object.keys(currentSpeaker).length > 0 && (
            <Country countryName={currentSpeaker.country} />
          )}
        </div>
        <hr id='whiteLine' />
        <Typography variant='h5'>In Queue:</Typography>
        <div id='speakersListCountry'>
          {speakers.map((speaker, index) => (
            <Country key={index} countryName={speaker.country} position={index + 1} />
          ))}
        </div>
        <div id='joinButton'>
          <CoolButton buttonText='Join Queue' buttonColor={'#FF9728'} textColor={'white'} onClick={onClick} />
        </div>
      </Paper>
    </div>
  );
};

export default SpeakersList;


