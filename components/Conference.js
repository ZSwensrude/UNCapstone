import React from 'react';
import flagsData from '../flags.json';
import { Meteor } from 'meteor/meteor';

const Country = ({ position, countryName }) => {
// Function to retrieve user information from localStorage
const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem('loggedInUser');
  return userString ? JSON.parse(userString) : null;
};
// Get user information from localStorage
const user = getUserFromLocalStorage();
  // Find the country object in flagsData
  const countryObject = flagsData.countries.find(country => country.country.toLowerCase() === countryName.toLowerCase());

  if (!countryObject) {
    console.error(`Flag not found for country: ${countryName}`);
    return null;
  }

  const { flagPath } = countryObject;
  const isCurrentUser = user && countryObject.country.toLowerCase() === user.country.toLowerCase();
  const classNames = isCurrentUser ? 'currentUser' : '';

  return (
    <li className={`countryItem ${classNames}`}>
      {position !== "" && <p className='countryname'>{position}</p>}
      <p className='countryname'>{countryObject.name}</p>
      <img id='itemflag' src={window.location.origin + flagPath} alt={`Flag of ${countryName}`} />
    </li>
  );
};

export default Country;
