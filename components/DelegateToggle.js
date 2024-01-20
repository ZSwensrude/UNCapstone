import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CoolButton from './CoolButton';

const DelegateToggle = ({ formal, onClick }) => {
  return (
    <Paper id='toggleBack'>
      { formal ? (
        <>
          <Typography id='toggleText' >Formal</Typography>
          <CoolButton buttonColor={'black'} textColor={'white'} buttonText={'Informal'} onClick={onClick}/>
        </>
      ) : (
        <>
          <CoolButton buttonColor={'black'} textColor={'white'} buttonText={'Formal'} onClick={onClick}/>
          <Typography id='toggleText' >Informal</Typography>
        </> 
      )}
    </Paper>
  );
}

export default DelegateToggle;