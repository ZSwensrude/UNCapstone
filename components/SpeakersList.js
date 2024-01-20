import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';


const SpeakersList = () => {

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

        <div id='joinButton'>
          <CoolButton buttonText='join queue' buttonColor={'#FF9728'}/>
        </div>
      </Paper>
    </div>
  );
}


export default SpeakersList;