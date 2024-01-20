import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';

const DelegateToggle = () => {
  return (
    <Paper id='toggleBack'>
      <CoolButton buttonColor={'white'} textColor={'black'} buttonText={'Formal'} />
      <Typography id='toggleText' >Informal</Typography>
    </Paper>
  );
}

export default DelegateToggle;