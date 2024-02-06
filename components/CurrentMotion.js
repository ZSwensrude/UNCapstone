//currentMotion
import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import VoteBox from './VoteBox';


const CurrentMotion = ({ motion, onVote, country, abstain }) => {
  // checks if there are any motions, if not doesn't display any
  const isMotion = Object.keys(motion).length > 0;

  console.log('Motion:', motion.content);

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
          <VoteBox onVote={onVote} country={country} abstain={abstain} />
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