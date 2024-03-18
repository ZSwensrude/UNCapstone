import React from "react";
import { Paper, Typography }from '@mui/material/Paper';
import './DiasComponents.css';

const CountryVotesMotion = ({countryName}) => {

    return (

        <Paper id={'oneCountry'} elevation={0}>
            <Typography>{countryName?.country ?? "Country"}</Typography>
            
        </Paper>
    );
};

//<Typography>{countryName?.vote ?? "vote"}</Typography>

export default CountryVotesMotion;