import React, {useState} from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';

const VoteBox = ({ country, abstain }) => {
  const [selectedOption, setSelectedOption] = useState('');

  abstain = true;

  const handleOptionChange = (event) => {
    console.log("clicked: ", event.currentTarget.getAttribute("value"));
    setSelectedOption(event.currentTarget.getAttribute("value"));
  };

  const vote = (choice) => {
    console.log("clicked: ", choice);
    //setSelectedOption(choice);
  }

  return (
    <div className="votebox">
      <Typography className='motionText' variant='h2'>
          {country + "'s Vote:"}
      </Typography>
      <div>
        <div className='box' value='Yes' onClick={handleOptionChange}/>
        <div className='box' value='No' onClick={handleOptionChange}/>
        { abstain && (
          <div className='box' value='Abstain' onClick={handleOptionChange}/>
        )}
      </div>
      <div>
        <Typography className='voteOptions'>Yes</Typography>
        <Typography className='voteOptions'>No</Typography>
        { abstain && (
          <Typography className='voteOptions'>Abstain</Typography>
        )}
      </div>
    </div>
  );
};


export default VoteBox;