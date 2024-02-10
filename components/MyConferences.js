import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import './DiasComponents.css';

const MyConference = ({conferenceGroup}) => {

    return (
        <Paper id={'oneConference'} elevation={0}>
        <Typography>{conferenceGroup?.conferenceName?? "Name"}</Typography>
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Typography>{conferenceGroup?.status?? "Status"}</Typography>
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Typography>{conferenceGroup?.dateCreated?? "Date"}</Typography>
        </Paper>


    );
}

export default MyConference;