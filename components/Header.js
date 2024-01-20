import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';

const Header = ( {country, flagPath} ) => {
  
  return (
    <div id='headerbar'>
      <Paper id='logoback' elevation={0}>
        <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
      </Paper>
      <Typography variant='h3'>{country}</Typography>
      <img id='flag' src={window.location.origin + flagPath} alt='United Nations Logo' />
    </div>
  );
}


export default Header;