import React from "react";
import { Paper, Typography, Divider} from "@mui/material";
import './DiasComponents.css';
import MailIcon from '@mui/icons-material/Mail';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NotesToDias = ({aDiasNote}) => {

    return (
        <Paper id={'oneNote'} elevation={0}>
        <Typography>{aDiasNote?.noteCountry?? "Country"}</Typography>
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Typography>{aDiasNote?.noteFromCountry?? "Note"}</Typography>
        <MailIcon style={{color:"gray"}} fontSize="medium"/>
        <ArrowForwardIosIcon style={{color:"gray"}} fontSize="medium"/>
        </Paper>
    );
}

export default NotesToDias;