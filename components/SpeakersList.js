import React, { useEffect, useState } from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';
import Country from './Country';

const SpeakersList = () => {
  const [speakers, setSpeakers] = useState([]);
  const [currentSpeaker, setCurrentSpeaker] = useState({})

  // need to get automagically from database
  useEffect(() => {
    setSpeakers([
      {
        "country": "canada"
      },
      {
        "country": "ireland"
      },
      {
        "country": "namibia"
      }
    ]);
    setCurrentSpeaker({'country': 'ukraine'})
  }, [])

  // join handles join speakers list button
  const onClick = () => {
    // add this group to the speakers list
    console.log("join button clicked");
  }

  return(
    <div id='speakers'>
      <Paper id='top' elevation={4}>
        <Typography variant='h4'>
          Speakers List
        </Typography>
      </Paper>
      <Paper id='body' elevation={4}>
        <Typography variant='h5'>
          Currently Speaking:
        </Typography>
        
        <div id='speakersListCountry'>
          {Object.keys(currentSpeaker).length > 0 && (
            <Country countryName={currentSpeaker.country} />
          )}
        </div>
        
        <hr id='whiteLine'/>
        <Typography variant='h5'>
          In Queue:
        </Typography>
        
        <div id='speakersListCountry'>
          {speakers.map( (speaker, index) => (
            <Country key={speaker.country} countryName={speaker.country} position={index+1} />
          ))}
        </div>

        <div id='joinButton'>
          <CoolButton buttonText='join queue' buttonColor={'#FF9728'} textColor={'white'} onClick={onClick}/>
        </div>
      </Paper>
    </div>
  );
}


export default SpeakersList;