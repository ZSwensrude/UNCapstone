import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Typography } from "@mui/material";
import { delCollection } from "../imports/api/delegates";
import { useNavigate  } from 'react-router-dom';
import Header from "../components/Header";
import Country from "../components/Country"; 
import CoolButton from '../components/CoolButton';

Meteor.subscribe('delegates');

const Waiting = () => {
  const navigate = useNavigate();

  const toRollCall = () => {
    navigate('/delegate-roll-call');
  };
    
    const { countriesFromDB } = useTracker(() => {
      const handler = Meteor.subscribe('delegates');
      const countriesFromDB = delCollection.find().fetch();
      return { countriesFromDB };
  });

  // Filter countries based on roleCall
  const filteredCountries = countriesFromDB;
  console.log('the countries in table',filteredCountries);

  return (
    <div className="waitingScreen">
      <Header version={'delegate'} country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
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
        <div className='btncont'>
          <CoolButton  buttonColor={'black'} textColor={'white'} buttonText={'Next'} onClick={toRollCall} />
        </div>
      </div>
      
    </div>
  );
};

export default Waiting;