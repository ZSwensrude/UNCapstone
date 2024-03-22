import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Typography } from "@mui/material";
//import { delCollection } from "../imports/api/delegates";
import { useFetcher, useNavigate  } from 'react-router-dom';
import Header from "../components/Header";
import Country from "../components/Country"; 
import CoolButton from '../components/CoolButton';
import DelRollCall from '../components/DelRollCall'; // Update the path accordingly
import { conferenceCollection } from "../imports/api/conference";

Meteor.subscribe('delegates');

const Waiting = () => {
  const navigate = useNavigate();
  const [showRollCall, setShowRollCall] = useState(false);
  const [openRollCall, setOpenRollCall] = useState(false);
  const testing = false;

  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const user = getUserFromLocalStorage();

  const [countriesFromDB, setCountriesFromDB] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch conference data using useTracker hook
  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne({ sessionID: user.confID });
    if(data) {
      setOpenRollCall(data.rollCallOpen);
      setCountriesFromDB(data.delegates);
      setFilteredCountries(data.delegates);
    }
    
  }, []);

  // tracks whether roll call should be open or not and opens/closes it
  useEffect( () => {
    if (openRollCall)
      setShowRollCall(openRollCall)
    if (!openRollCall)
      closeRollCall();
  }, [openRollCall]);

  const toRollCall = () => {
    if(showRollCall===false){
    setShowRollCall(true);
    }
    else{
      setShowRollCall(false);
    }
    //console.log(showRollCall);
  };

  const closeRollCall= () => {
    setShowRollCall(false);
  };
  
  
  return (
    <div className="waitingScreen">
    <Header version={'delegate'} country={(user.country)} flagPath={`/images/flags/${user.country}.png`} />
      <div className="waitingbox">
        <span>Waiting for Dias to start the conference</span>
        <div className="country in queue">
          <span>Countries joined:</span>
          {filteredCountries.length > 0 ? (
            <ul className='waitingList'>
              {filteredCountries.map((country, index) => (
                <Country
                  key={country._id}
                  //position={index + 1}
                  countryName={country.country}
                />
              ))}
            </ul>
          ) : (
            <Typography variant="body2">No countries present yet.</Typography>
          )}
        </div>
        { testing && (
          <div className='btncont'>
            <CoolButton  buttonColor={'black'} textColor={'white'} buttonText={'Next'} onClick={toRollCall} />
          </div>
        )}
      </div>

      {showRollCall && <DelRollCall onClose={closeRollCall} />}
    </div>
  );
};

export default Waiting;
