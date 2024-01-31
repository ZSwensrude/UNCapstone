import React from "react";
import { Typography, Dialog, DialogTitle, DialogContent, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import './DelRollCall.css';

const DelRollCall = () => {
  const [open, setOpen] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSave = () => {
    // Handle the selected option as needed
    console.log('Selected Option:', selectedOption);
    setOpen(false);
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
