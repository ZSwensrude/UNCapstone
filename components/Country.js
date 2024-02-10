// Import the necessary dependencies
import React, { useCallback } from 'react';
import flagsData from '../flags.json';
import { Meteor } from 'meteor/meteor';
import { removeSpeaker } from '../imports/api/speakers'; // Import the removeSpeaker function
import { speakerCollection } from '../imports/api/speakers';
// Define the Country component
const Country = ({ position, countryName }) => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  
  // Get user information from localStorage
  const user = getUserFromLocalStorage();

  // Find the country object in flagsData
  const countryObject = flagsData.countries.find(country => country.country === countryName);
  
  // If countryObject is not found, return null
  if (!countryObject) {
    console.error(`Flag not found for country: ${countryName}`);
    return null;
  }

  // Destructure flagPath from countryObject
  const { flagPath } = countryObject;
  
  // Check if the current user is the owner of the country
  const isCurrentUser = user && countryObject.country === user.country;
  
   // Check if the user is of type 'dias'
   const isDiasUser = user && user.userType === 'dias';

   //get speaker._id record where countryObject.country == speaker.country
   // Retrieve the documents from the cursor as an array
const speakersArray = speakerCollection.find().fetch();

// Find the speaker object with the matching country
const speakerObj = speakersArray.find(speakerObj => speakerObj.country === countryObject.country);
    // Define speakerID only if speakerObj is defined
    const speakerID = speakerObj ? speakerObj._id : null;

   
// Define a handler function to remove the country
const handleRemoveCountry = () => {
  if (isDiasUser) { 
    console.log("Remove country:", countryObject.country);
    console.log("speakerID: ", speakerID); 
    removeSpeaker({ _id: speakerID }); // Call the removeSpeaker function with the correct _id
  }
};
 

  // Define classNames based on conditions
  const classNames = isCurrentUser ? 'currentUser' : '';

  // Render the component
  return (
    <li className={`countryItem ${classNames}`}>
      {isDiasUser  && <button onClick={handleRemoveCountry}>X</button>}  
       {position !== "" && <p className='countryname'>{position}</p>}
      <p className='countryname'>{countryObject.name}</p>
      <img id='itemflag' src={window.location.origin + flagPath} alt={`Flag of ${countryName}`} />
    </li>
  );
};

// Export the Country component
export default Country;
