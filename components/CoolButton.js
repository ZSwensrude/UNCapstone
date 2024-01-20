import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const CoolButton = ({ buttonText, buttonColor, message, onClick }) => {
  const wide = message ? 'wideButton' : 'normalButton';

  return (
    <Paper onClick={onClick} id='button' className={wide} elevation={0} style={{backgroundColor:buttonColor}}>
      <Typography>
        {buttonText}
        {message !== undefined && <MessageIcon id='buttonIcon'/>}
      </Typography>
    </Paper>
  );
}

export default CoolButton;
