import React from "react";
import { Paper, Typography }from '@mui/material';
import './DiasComponents.css';
import flagsData from '../flags.json';

const CountryVotesMotion = ({countryName}) => {

    // Find the country object in flagsData
    const countryObject = flagsData.countries.find(country => country.country === countryName?.country);

    // Destructure flagPath from countryObject
    const { flagPath, name } = countryObject;

    if (countryName?.vote == "Yes") {
        colorVote="green"
    }
    else if (countryName?.vote == "No") {
        colorVote="red"
    }
    else {
        colorVote="yellow";
    }
    return (

        <Paper id={'oneCountry'} elevation={0} style={{backgroundColor: colorVote}}>
            <Typography>{name ?? "Country"}</Typography>
            <img id='itemflag' src={window.location.origin + flagPath} alt={`Flag of ${countryName}`} />
        </Paper>
    );
};

//<Typography>{countryName?.vote ?? "vote"}</Typography>

export default CountryVotesMotion;