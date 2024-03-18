import React, {useState} from "react";
import { Typography, Dialog, DialogTitle, DialogContent, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Meteor } from 'meteor/meteor';
import { conferenceCollection,updateDelRole  } from "../imports/api/conference";

const DelRollCall = () => {
  const [open, setOpen] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState('');
  const navigate = useNavigate();


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSave = () => {
      const getUserFromLocalStorage = () => {
      const userString = localStorage.getItem('loggedInUser');
      return userString ? JSON.parse(userString) : null;
    };
      // Get user information from localStorage
    const user = getUserFromLocalStorage();
    if (user) {
      var updated = updateDelRole(user.country, selectedOption, user.confID);
      setOpen(false);
      navigate('/delegate');    
    } else {
    // Handle the case where the current user is not available
    console.error('Current user not available');
    }
  };

  return (
    <div className="delrollcallPage">
      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle>
          <div className="title roll">
            <span>Roll Call</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="present" control={<Radio />} label="Present" />
            <FormControlLabel value="presentAndVoting" control={<Radio />} label="Present and Voting" />
          </RadioGroup>
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DelRollCall;
