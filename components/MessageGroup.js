import React, { useState } from "react";
import { Modal, Paper, Typography, TextField } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import { insertDM } from "../imports/api/dm";

const MessageGroup = ({ countries, groupname }) => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
   
  // handles opening and closing modal window
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputValue('');
  }

  // handles what is written in the text box
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // handles when send message button is clicked
  const sendMessage = () => {
    if (inputValue.length > 0) {
      // Send message to each country in the group
      countries.forEach(country => {
        console.log(`Sending message to ${country.name}: ${inputValue}`);
        insertDM({ type:"group", to: country.country, from: groupname, content: inputValue, read:"false" });
      });
    }
    handleClose();
  }

  return (
    <div>
      <CoolButton onClick={handleOpen} buttonColor={'#00DB89'} textColor={'white'} buttonText={'message'} message={true}/>
      <Modal className="modalWindow" open={open} onClose={handleClose}>
        <Paper className="modalContent" style={{borderRadius:'30px'}}>
          <Typography variant="h2">
            Message to Group
          </Typography>
          <Typography variant="subtitle1">
            You are messaging the following countries: {countries.map(country => country.name).join(', ')}
          </Typography>
          <TextField
            className="textBox"
            id="filled-multiline-static"
            label={'Message to members in group'}
            multiline
            rows={5}
            placeholder="Type here..."
            variant="filled"
            onChange={handleInputChange}
          />
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
                buttonText={"send"} 
                buttonColor={"#FF9728"} 
                textColor={'white'} 
                onClick={sendMessage}
              />
            </div>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default MessageGroup;
