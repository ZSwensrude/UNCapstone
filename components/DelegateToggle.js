import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';

const DelegateToggle = ({ formal, onClick }) => {
  return (
    <Paper id='toggleBack'>
      { formal ? (
        <>
          <CoolButton buttonColor={'white'} textColor={'black'} buttonText={'Formal'} onClick={onClick}/>
          <Typography id='toggleText' >Informal</Typography>
        </>
      ) : (
        <>
          <Typography id='toggleText' >Formal</Typography>
          <CoolButton buttonColor={'white'} textColor={'black'} buttonText={'Informal'} onClick={onClick}/>
        </> 
      )}
    </Paper>
  );
}

export default DelegateToggle;