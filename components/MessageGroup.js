import React, { useState } from "react";
import { Modal, Paper, Typography, TextField } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';


const MessageGroup = ({ country }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputValue('');
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessage = () => {
    if (inputValue.length > 0) {
      //send message to other working group here
      console.log(inputValue);
    }
    handleClose();
  }

  return (
    <div>
      <CoolButton onClick={handleOpen} buttonColor={'#00DB89'} textColor={'white'} buttonText={'message'} message={true}/>
      <Modal className="modalWindow" open={open} onClose={handleClose}>
        <Paper className="modalContent" style={{borderRadius:'30px'}}>
          <Typography variant="h2">
            Message {country}
          </Typography>
          {/*replace this TextField with the message builder if we do that*/}
          <TextField
            className="textBox"
            id="filled-multiline-static"
            label={'Message to ' + country}
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

