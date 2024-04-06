import React, { useState, useEffect} from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Modal, Paper, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import countriesData from '../flags.json'  
import CountryFlag from "./CountryFlag";
import { insertWG, insertDM, conferenceCollection} from "../imports/api/conference";

const CreateGroup = () => {
  const [open, setOpen] = useState(false);
  // remove the default value from this when getting from database
 
  //const [countries, setCountries] = useState(countriesData.countries);
  const [filteredCountries, setCountries] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false); // State to manage the popup
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [location, setLocation] = useState(""); // State to store location
  const [topic, setTopic] = useState(""); // State to store topic
  const [groupname, setName] = useState(""); // State to store name


  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const user = getUserFromLocalStorage();
  //DB Communication - live pull on any change in table
  useTracker(() => {
    const handler = Meteor.subscribe('conferences');
    const conference = conferenceCollection.findOne({ sessionID: user.confID });
  
    if (conference) {
      const delegatesListDias = conference.delegates || []; // Ensure delegates list is available
      const filteredCountries = countriesData.countries.filter(countryData => {
        // Check if the country's name exists in delegatesListDias
        return delegatesListDias.some(delegate => delegate.country === countryData.country && delegate.country !== user.country);
      });
      setCountries(filteredCountries);
    }
  }, []);
  


  // opening and closing modal window
  const handleOpen = () => {
    // we need to get the array of present countries here so we can show the flags
    // setCountries(countries from database)

    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  // when country flag is clicked
  const onSelect = (country) => {
    setSelectedCountries([...selectedCountries, country])
  }
  
  // when selected flag is clicked again
  const onDeselect = (country) => {
    setSelectedCountries(selectedCountries.filter((countryInList) => countryInList.country !== country.country));
  }
    // Handler for location field change
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };
    // Handler for topic field change
    const handleTopicChange = (event) => {
      setTopic(event.target.value);
    };
    // Handler for topic field change
    const handleNameChange = (event) => {
      setName(event.target.value);
    };

  // create button
  
  const create = async () => {
    try {
      const groupId = await insertWG({
        sessionId: user.confID,
        location: location,
        topic: topic,
        name: groupname,
        countries: [{country: user.country}],
      });

      if (groupId !== "error") {
        // /console.log("GroupID:", groupId);

        selectedCountries.forEach((country) => {
          insertDM({
            sessionId: user.confID,
            type: "invite",
            from: groupname,
            to: country.country,
            content: "Please join our group!",
            read: "false",
            groupId: groupId,
          });
        });

        handleClose();
      } else {
        console.error("Error: Group with the same name already exists.");
        // Show the popup if a group with the same name already exists
        setPopupOpen(true);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };
  
  return (
    <div>
      <CoolButton onClick={handleOpen} buttonColor={'#FF9728'} textColor={'white'} buttonText={'create group'}/>
      <Modal className="modalWindow" open={open} onClose={handleClose}>
        <Paper className="modalContent" style={{borderRadius:'30px'}}>
          <Typography variant="h2">
            Create Working Group
          </Typography>
          <div className="textInput">
            <Typography>Group Name:</Typography>
            <TextField
              label="Name"
              id="outlined-size-small"
              placeholder="Enter Group Name"
              size="small"
              onChange={handleNameChange} // Handling change event
            />
          </div>
          <div className="textInput">
            <Typography>Location:</Typography>
            <TextField
              label="Location"
              id="outlined-size-small"
              placeholder="Enter Location"
              size="small"
              onChange={handleLocationChange} // Handling change event
            />
          </div>
          <div className="textInput">
            <Typography>Topic:</Typography>
            <TextField
              label="Topic"
              id="outlined-size-small"
              placeholder="Enter Group Topic"
              size="small"
              onChange={handleTopicChange} // Handling change event
            />
          </div>
          <hr className="blackLine" />
          <Typography>Select countries to invite: </Typography>

          <div className="flagList">
            {filteredCountries && filteredCountries.map((country, index) => (
              <CountryFlag country={country} key={country.country + index} onSelect={onSelect} onDeselect={onDeselect} />
            ))}
          </div>
          <div className="buttonContainer">
            <div className="button-wrapper">
              <CoolButton 
                className="cancelButton" 
                buttonText={"cancel"} 
                buttonColor={"#FF9728"} 
                textColor={'white'} 
                onClick={handleClose}
              />
            </div>
            <div className="button-wrapper">
              <CoolButton 
                className="sendButton" 
                buttonText={"create"} 
                buttonColor={"#FF9728"} 
                textColor={'white'} 
                onClick={create}
              />
            </div>
          </div>
        </Paper>
      </Modal>
      <Dialog open={popupOpen} onClose={handlePopupClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Group with the same name already exists.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CoolButton onClick={handlePopupClose} buttonColor={'#FF9728'} textColor={'white'} buttonText={'Okay'} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateGroup;

