import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import './DiasComponents.css';

const MyConference = ({title, date}) => {

    return (
        <Paper id={'oneConference'} elevation={0}>
        <Typography>{title}</Typography>
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        {/* <Typography>{conferenceGroup?.status?? "Status"}</Typography> */}
        <Typography>{"Active"}</Typography>
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Typography>{date.toLocaleDateString()}</Typography>
        </Paper>


    );
}

export default MyConference;