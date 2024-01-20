import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';


const CoolButton = ({ buttonText, buttonColor }) => {
  const TestClick = () => {
    console.log("Clicked button: ", buttonText);
  }

  return (
    <Paper onClick={TestClick} id='button' style={{backgroundColor:buttonColor}}>
      <Typography>
        {buttonText}
      </Typography>
    </Paper>
  );
}

export default CoolButton;
