import React, { useState } from "react";
import { Modal, Paper, Typography, TextField } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import countriesData from '../flags.json'  
import CountryFlag from "./CountryFlag";
import { insertWG, workingGroupCollection } from "../imports/api/workingGroups";

const CreateGroup = () => {
  const [open, setOpen] = useState(false);
  // remove the default value from this when getting from database
  const [countries, setCountries] = useState(countriesData.countries);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [location, setLocation] = useState(""); // State to store location
  const [topic, setTopic] = useState(""); // State to store topic
  const [groupname, setName] = useState(""); // State to store name

  
  
  // opening and closing modal window
  const handleOpen = () => {
    // we need to get the array of present countries here so we can show the flags
    // setCountries(countries from database)

    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

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
  const create = () => {
    console.log("create pressed");
    console.log("countries chosen: ", selectedCountries);
    console.log("Location: ", location); // Logging location value
    console.log("Topic: ", topic); // Logging topic value
    console.log("name:", groupname );

    // send the countries from selectedCountries messages

    // add that new group to the database
    // create the working group with selected countries, location, and topic
    insertWG({
      countries: selectedCountries,
      location: location, // Using the location state
      topic: topic, // Using the topic state
      name: groupname
    });

    handleClose();
  }
  
  return (
    <div>
      <CoolButton onClick={handleOpen} buttonColor={'#FF9728'} textColor={'white'} buttonText={'create group'}/>
      <Modal className="modalWindow" open={open} onClose={handleClose}>
        <Paper className="modalContent" style={{borderRadius:'30px', height:'60vh'}}>
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

          <div className="flagList">
            {countries.map( (country, index) => (
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
    </div>
  );
};

export default CreateGroup;
