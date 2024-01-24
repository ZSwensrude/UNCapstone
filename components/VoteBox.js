import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';

const VoteBox = ({ country }) => {
  return (
    <div className="votebox">
      <Typography className='motionText' variant='h2'>
          {country + "'s Vote:"}
      </Typography>
    </div>
  );
};


export default VoteBox;