import React, { useEffect, useState } from 'react';
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

  
  const onClick = () => {
    if (user && user.country) {
      //console.log("added to speaker DB:", user.country);
      insertSpeaker({ country: user.country });
    } else {
      console.error("User or country is undefined.");
    }
  };
  
  
  
  const [SpeakersListActive, setSpeakersListActive] = useState(false);
  const [speakersOnList, setSpeakersOnList] = useState([]);
  
  //Use useTracker to reactively fetch data from the collection
  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    // session ID stored in users local browser data as confID 
    const conferenceData = conferenceCollection.find({ sessionID: getUserFromLocalStorage().confID }).fetch(); 
    // Check if conferenceData is defined before accessing its properties
    const activeSpeakerList = conferenceData && conferenceData.length > 0 ? conferenceData[0].activeSpeakerList : false;
    const currentSpeakers = conferenceData && conferenceData.length > 0 ? conferenceData[0].speakers : [];
    
    console.log(currentSpeakers);
    setSpeakersOnList(currentSpeakers);
    setSpeakersListActive(activeSpeakerList);
    
  }, []);
  // set current speaker
  const currentSpeaker = speakersOnList.length > 0 ? speakersOnList[0] : {};
  // Check if the user's country is in the speakers list
  let isUserInQueue = speakersOnList.some(speaker => speaker.country === user?.country);
  
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
        {speakersOnList.slice(1).map((speaker, index) => (
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


