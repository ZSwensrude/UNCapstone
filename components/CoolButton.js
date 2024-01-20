import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';


const CoolButton = ({ buttonText, buttonColor, onClick }) => {

  return (
    <Paper onClick={onClick} id='button' style={{backgroundColor:buttonColor}}>
      <Typography>
        {buttonText}
      </Typography>
    </Paper>
  );
}

export default CoolButton;
