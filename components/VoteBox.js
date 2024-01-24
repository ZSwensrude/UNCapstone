import React, {useState} from 'react';
import './components.css';
import { Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VoteBox = ({ country, abstain }) => {
  const [selectedOption, setSelectedOption] = useState('');

  abstain = true;

  const handleOptionChange = (event) => {
    console.log("clicked: ", event.currentTarget.getAttribute("value"));
    setSelectedOption(event.currentTarget.getAttribute("value"));
  };

  return (
    <div className="votebox">
      <Typography className='motionText' variant='h2'>
          {country + "'s Vote:"}
      </Typography>
      <div>
        <div className='box' style={{backgroundColor:'#4aff7d'}} value='Yes' onClick={handleOptionChange}>
          {selectedOption === 'Yes' && ( <CloseIcon style={{fontSize:'4rem', marginTop:'1vh'}}/> )}
        </div>
        <div className='box' style={{backgroundColor:'#ff4a4a'}} value='No' onClick={handleOptionChange}>
          {selectedOption === 'No' && ( <CloseIcon style={{fontSize:'4rem', marginTop:'1vh'}}/> )}
        </div>
        { abstain && (
          <div className='box' style={{backgroundColor:'#ffc94a'}} value='Abstain' onClick={handleOptionChange}>
            {selectedOption === 'Abstain' && ( <CloseIcon style={{fontSize:'4rem', marginTop:'1vh'}}/> )}
          </div>
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