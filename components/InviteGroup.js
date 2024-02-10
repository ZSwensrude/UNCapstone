import React, { useState, useEffect } from "react";
import { Modal, Paper, Typography, TextField } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import countriesData from '../flags.json'  
import CountryFlag from "./CountryFlag";
import { workingGroupCollection, updateWG } from "../imports/api/workingGroups";
import { insertDM } from "../imports/api/dm";

const InviteGroup = ({ onInvite, group }) => {
    const [open, setOpen] = useState(false);
    const [workingGroup, setWorkingGroup] = useState(group);
    const [selectedCountries, setSelectedCountries] = useState(group ? group.countries : []);
    const [location, setLocation] = useState(group ? group.location : "");
    const [topic, setTopic] = useState(group ? group.topic : "");
    const [groupname, setGroupname] = useState(group ? group.name : "");
    const [countries, setCountries] = useState(countriesData.countries);
  
    // Function to handle opening and closing modal window
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    // Handler for location field change
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };
  
    // Handler for topic field change
    const handleTopicChange = (event) => {
      setTopic(event.target.value);
    };
  
    // Handler for group name field change
    const handleNameChange = (event) => {
      setGroupname(event.target.value);
    };
  
    // Handler for selecting a country
    const onSelect = (country) => {
      setSelectedCountries([...selectedCountries, country]);
    };
  
    // Handler for deselecting a country
    const onDeselect = (country) => {
      setSelectedCountries(selectedCountries.filter((selectedCountry) => selectedCountry.country !== country.country));
    };
  
    // Function to update group
    const updateGroup = async () => {
      console.log("Working group: ", workingGroup);
      console.log("Selected countries: ", selectedCountries);
      console.log("Location: ", location);
      console.log("Topic: ", topic);
      console.log("Name: ", groupname);
  
      try {
        // Update the existing working group with the provided data
        await updateWG({
          groupId: workingGroup._id,
          name: groupname,
          topic: topic,
          location: location,
          //newCountries: selectedCountries
        });
  
        // Get the countries already present in the working group
    const existingCountries = workingGroup.countries.map(country => country.country);

    // Filter out the selected countries that are already in the collection
    const newCountries = selectedCountries.filter(country => !existingCountries.includes(country.country));
    console.log("NEW COUTNRIES", newCountries);
    // Insert a direct message for each new country
    newCountries.forEach(country => {
      insertDM({
        type: "invite",
        from: groupname,
        to: country.country,
        content: "Please join our group!",
        read: "false",
        groupId: workingGroup._id
      });
    });
  
        handleClose();
      } catch (error) {
        console.error('Error updating group:', error);
      }
    };
        
    return (
      <div>
        <CoolButton onClick={handleOpen} buttonColor={'#FF9728'} textColor={'white'} buttonText={'edit group'}/>
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
                value={groupname}
                onChange={handleNameChange}
              />
            </div>
            <div className="textInput">
              <Typography>Location:</Typography>
              <TextField
                label="Location"
                id="outlined-size-small"
                placeholder="Enter Location"
                size="small"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
            <div className="textInput">
              <Typography>Topic:</Typography>
              <TextField
                label="Topic"
                id="outlined-size-small"
                placeholder="Enter Group Topic"
                size="small"
                value={topic}
                onChange={handleTopicChange}
              />
            </div>
            <hr className="blackLine" />
  
            <div className="flagList">
              {countries.map((country, index) => (
                <CountryFlag
                  key={country.country + index}
                  country={country}
                  onSelect={onSelect}
                  onDeselect={onDeselect}
                  selected={selectedCountries.some(selectedCountry => selectedCountry.country === country.country)}
                />
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
                  buttonText={"update"} 
                  buttonColor={"#FF9728"} 
                  textColor={'white'} 
                  onClick={updateGroup}
                />
              </div>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  };
  
  export default InviteGroup;
