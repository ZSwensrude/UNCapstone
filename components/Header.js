import React from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import flagsData from '../flags.json';


const Header = ( {version, country} ) => {
  // Function to convert a string to title case
  const toTitleCase = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  //const flagPath = country ? flagsData.countries.find(countryData => countryData.country.toLowerCase() === country.toLowerCase())?.flagPath : null;
 
  // Find the flag path and country name based on the country
  const countryData = country ? flagsData.countries.find(countryData => countryData.country.toLowerCase() === country.toLowerCase()) : null;
  const flagPath = countryData?.flagPath;
  const countryName = countryData?.name;
  return (
    <div id='headerbar'>
      { version === 'delegate' && (
        <>
          <Paper id='logoback' elevation={0}>
            <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
          </Paper>
          
          <Typography variant='h3'>{countryName}</Typography>
          <img id='flag' src={window.location.origin + flagPath} alt={`Flag of ${country}`} title={countryName} />
        </>
      ) }

      { version === 'dias' && (
        <>
          <Paper id='logoback' elevation={0}>
            <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
          </Paper>
          <SettingsIcon id='settings'/>
        </>
      ) }

      { version === 'blank' && (
        <>
         
        </>
      ) }

    </div>
  );
}


export default Header;