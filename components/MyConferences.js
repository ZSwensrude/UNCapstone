import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import './DiasComponents.css';
import CoolButton from "./CoolButton";
import { useNavigate } from "react-router-dom";

const MyConference = ({sessionID, title, date}) => {
  const navigate = useNavigate();

  const selectConference = () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ userType: 'dias', confID: sessionID }));

    navigate('/dias-home-page');
  }

  return (
    <Paper id={'oneConference'} elevation={0}>
    <Typography>{title}</Typography>
    <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
    <Typography>{date.toLocaleDateString()}</Typography>
    <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
    <CoolButton buttonText={"Select"} onClick={selectConference} buttonColor={'#FF9728'} textColor='white' />
    </Paper>


  );
}

export default MyConference;