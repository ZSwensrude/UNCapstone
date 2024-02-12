//CurrentMotion.js
import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import VoteBox from './VoteBox';

const CurrentMotion = ({ motion, country, abstain, user}) => {
  // Check if motion exists and has the content property
  //console.log("The motion: ",motion);
  const isMotion = motion && motion.content !== undefined;

  return (
    <>
      {isMotion && (
        <Paper id="motion">
          <Typography className='motionText' variant='h2'>
            Vote on Current Motion
          </Typography>
          <hr className='blackLine' />
          <Typography className='motionText'>
            {motion.content}
          </Typography>
          <hr className='blackLine' id='middleLine' />
          <VoteBox motion={motion} country={country} abstain={abstain} user={user}/>
        </Paper>
      )}

      {!isMotion && (
        <Typography id='noMotion' variant='h4'>
          No Current Motion
        </Typography>
      )}
    </>
  );
};

export default CurrentMotion;
