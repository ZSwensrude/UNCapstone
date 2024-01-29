// Country.jsx
import React from 'react';
import flagsData from '../flags.json';

const Country = ({ position, countryName }) => {
  // Find the country object in flagsData
  const countryObject = flagsData.countries.find(country => country.country.toLowerCase() === countryName.toLowerCase());

  if (!countryObject) {
    console.error(`Flag not found for country: ${countryName}`);
    return null;
  }

  const { flagPath } = countryObject;

  return (
    <li className='countryItem'>
      {position !== "" && <p>{position}</p>}
      <p className='countryname'>{countryObject.name}</p>
      <img id='itemflag' src={window.location.origin + flagPath} alt={`Flag of ${countryName}`} />
    </li>
  );
};

export default Country;
