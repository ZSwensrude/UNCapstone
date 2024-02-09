import React, { useState, useEffect } from 'react';
import './components.css';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CoolButton from './CoolButton';
import { motionCollection } from "../imports/api/motions";

const VoteBox = ({ motion, country, abstain, user }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [countryAlreadyVoted, setCountryAlreadyVoted] = useState(false);

  useEffect(() => {
    // Check if the user's country is in the motion collection
    const countryVoted = motion.votes.some(vote => vote.country === user);
    setCountryAlreadyVoted(countryVoted);
  }, [motion, user.country]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitVote = () => {
    if (selectedOption) {
      // Update the motion in the database
      const updatedVotes = [...motion.votes, { country: user, vote: selectedOption }];
      motionCollection.update({ _id: motion._id }, { $set: { votes: updatedVotes } });
      // Reset selectedOption after submitting vote
      setSelectedOption('');
      // Set voteSubmitted to true
      setVoteSubmitted(true);
    } else {
      console.error('No option selected.');
    }
  };

  return (
    <div className="votebox">
      {!countryAlreadyVoted && !voteSubmitted && (
        <>
          <Typography className='motionText' variant='h2'>
            {country + "'s Vote:"}
          </Typography>
          <div>
            <div className='box' style={{ backgroundColor: '#4aff7d' }} onClick={() => handleOptionChange('Yes')}>
              {selectedOption === 'Yes' && (<CloseIcon style={{ fontSize: '4rem', marginTop: '1vh' }} />)}
            </div>
            <div className='box' style={{ backgroundColor: '#ff4a4a' }} onClick={() => handleOptionChange('No')}>
              {selectedOption === 'No' && (<CloseIcon style={{ fontSize: '4rem', marginTop: '1vh' }} />)}
            </div>
            {abstain && (
              <div className='box' style={{ backgroundColor: '#ffc94a' }} onClick={() => handleOptionChange('Abstain')}>
                {selectedOption === 'Abstain' && (<CloseIcon style={{ fontSize: '4rem', marginTop: '1vh' }} />)}
              </div>
            )}
          </div>
          <div>
            <Typography className='voteOptions'>Yes</Typography>
            <Typography className='voteOptions'>No</Typography>
            {abstain && (
              <Typography className='voteOptions'>Abstain</Typography>
            )}
          </div>
          <div className='submitVote'>
            <CoolButton buttonColor={'#FF9728'} buttonText={'Submit'} textColor={'white'} onClick={handleSubmitVote} />
          </div>
        </>
      )}
      {/* {voteSubmitted && (
        <Typography variant="h2">Thanks for your vote!</Typography>
      )} */}
      {countryAlreadyVoted && (
        <Typography variant="h2">Thanks for your vote!</Typography>
      )}
    </div>
  );
};

export default VoteBox;
