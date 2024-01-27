import React, { useEffect, useState } from 'react';
import './components.css';
import { Typography, Paper, Snackbar } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const CoolButton = ({ buttonText, buttonColor, textColor, message, onClick, disabled }) => {
  // if disabled display nadda nothing zilch
  if (disabled)
    return(<></>)

  const wide = message ? 'wideButton' : 'normalButton';

  return (
    <Paper onClick={onClick} id='button' className={wide} elevation={0} style={{backgroundColor:buttonColor, color:textColor}}>
      <Typography>
        {buttonText}
        {message !== undefined && <MessageIcon id='buttonIcon'/>}
      </Typography>
    </Paper>
    
  );
}

export default CoolButton;
