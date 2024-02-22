import React from 'react';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';
import Country from './Country';
import { speakerCollection, insertSpeaker } from '../imports/api/speakers';
import { useTracker } from 'meteor/react-meteor-data';
import { conferenceCollection } from "../imports/api/conference";



const SpeakersList = ({ blank }) => {
  
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
      //console.log("added to speaker DB:", user.country);
      insertSpeaker({ country: user.country });
    } else {
      console.error("User or country is undefined.");
    }
  };

    // Check if the user's country is in the speakers list
    let isUserInQueue = speakers.some(speaker => speaker.country === user?.country);

   //Use useTracker to reactively fetch data from the collection
   const { SpeakersListActive } = useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const conferenceData = conferenceCollection.find().fetch(); //add .find for filter by session id later
    // Check if conferenceData is defined before accessing its properties
    const activeSpeakerList = conferenceData && conferenceData.length > 0 ? conferenceData[0].activeSpeakerList : false;
  
    return { SpeakersListActive: activeSpeakerList };
  });

  // if we want a blank list we have to convince the list to display no buttons
  if (blank) {
    isUserInQueue = true;
  }

  return (
    <div id='speakers'>
      {/* <div id='top' elevation={4}> */}
        <Typography variant='h4'>Speakers List</Typography>
      {/* </div> */}
      {/* <div id='body' elevation={4}> */}
        <Typography variant='h5'>Currently Speaking:</Typography>
        <div id='speakersListCountry'>
          {Object.keys(currentSpeaker).length > 0 && (
            <Country countryName={currentSpeaker.country} blank={blank} />
          )}
        </div>
        <hr id='whiteLine' />
        <Typography variant='h5'>In Queue:</Typography>
        <div className='upcomingSpeakers'>
          <ul className='countryItemList'>
        {speakers.slice(1).map((speaker, index) => (
            <Country key={index + 1} countryName={speaker.country} position={index + 2} blank={blank} />
          ))}
          </ul>
        </div>
        {/* Render the "Join Queue" button or the message based on SpeakersListActive */}
        {SpeakersListActive ? (
          !isUserInQueue && (
            <div id='joinButton'>
              <CoolButton buttonText='Join Queue' buttonColor={'#FF9728'} textColor={'white'} onClick={onClick} />
            </div>
          )
        ) : (
          <Typography variant='body1' style={{ marginTop: '10px' }}>Joining Speakers List is currently closed</Typography>
        )}
      </div>
    // </div>
  );
};

export default SpeakersList;


