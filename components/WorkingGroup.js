import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'
import flagsData from '../flags.json';

const WorkingGroup = ({ workingGroup, chooseGroup, isInUserCountry, Dias }) => {
  // Function to get the flag path for a given country code
  const getFlagPath = (countryCode) => {
    if (!countryCode || !countryCode.country) return null; // Ensure countryCode is valid
    const country = flagsData.countries.find(country => country.country.toLowerCase() === countryCode.country.toLowerCase());
    return country ? country.flagPath : null;
  };

  const getFlagName = (countryCode) => {
    if (!countryCode || !countryCode.country) return null; // Ensure countryCode is valid
    const country = flagsData.countries.find(country => country.country.toLowerCase() === countryCode.country.toLowerCase());
    return country ? country.name : null;
  };

  // Handles when the user clicks on the "view group" button
  const onClick = () => {
    // If Dias is true, call chooseGroup with the workingGroup and 'Dias' as arguments
    if (Dias) {
      chooseGroup(workingGroup, 'Dias');
    } else {
      chooseGroup(workingGroup);
    }
  };

  return (
    <Paper id={'workingGroupBack'} elevation={0} className={isInUserCountry ? 'userInWorkingGroup' : ''}>
      <Typography>{workingGroup?.name ?? "Group"}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginRight: '10px', marginLeft: '10px' }} />

      {/* Rendering flags for countries in the working group */}
      {workingGroup?.countries?.map((country, index) => (
        <img className="workingGroupFlag" key={country.country + index} src={window.location.origin + getFlagPath(country)} alt={country.name} title={getFlagName(country)} />
      ))}

      <div className="workingGroupButton">
        {/* If Dias is true, show 'View Dias' button, else show 'View' button */}
        <CoolButton textColor={'white'} buttonText={Dias ? 'Edit' : 'View'} buttonColor={'#00DB89'} onClick={onClick} />
      </div>
    </Paper>
  );
};

export default WorkingGroup;
