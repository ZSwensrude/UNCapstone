import React from "react";
import { Typography, Dialog, DialogTitle, DialogContent, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Meteor } from 'meteor/meteor';
import { delCollection } from "../imports/api/delegates";

const DelRollCall = () => {
  const [open, setOpen] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSave = () => {
    // Get the current user
      // Function to retrieve user information from localStorage
      const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('loggedInUser');
        return userString ? JSON.parse(userString) : null;
      };
      // Get user information from localStorage
      const user = getUserFromLocalStorage();
    if (user) {
      // Find the corresponding record in the delegates table and update the roll call value
      const existingDelegate = delCollection.findOne({ country: user.country });

      if (existingDelegate) {
        // Update the roll call value
        console.log("Rollcall should update here")
        delCollection.update(existingDelegate._id, { $set: { roleCall: selectedOption } });
        setOpen(false);
        navigate('/delegate');
      } else {
        // If the user is not found in the delegates table, you may want to handle this case
        console.error('User not found in delegates table');
      }

      
    } else {
      // Handle the case where the current user is not available
      console.error('Current user not available');
    }
  };

  return (
    <div className="delrollcallPage">
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
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
