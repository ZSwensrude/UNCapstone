import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';


const SpeakersList = () => {
  const onClick = () => {
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
        
        {/* put currently speaking here */}
        
        <hr />
        <Typography variant='h5'>
          In Queue:
        </Typography>

        {/* put speakers queue here */}

        <div id='joinButton'>
          <CoolButton buttonText='join queue' buttonColor={'#FF9728'} textColor={'white'} onClick={onClick}/>
        </div>
      </Paper>
    </div>
  );
}


export default SpeakersList;