import React, { useState, useEffect } from 'react';
import './components.css';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CoolButton from './CoolButton';
import { conferenceCollection, addMotionVote } from "../imports/api/conference";

const VoteBox = ({ motion, country, abstain, user }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [countryAlreadyVoted, setCountryAlreadyVoted] = useState(false);
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const votinguser = getUserFromLocalStorage();

  useEffect(() => {
    // Check if the user's country is in the motion collection
    const countryVoted = motion.votes.some(vote => vote.country === user);
    setCountryAlreadyVoted(countryVoted);
  }, [motion, user.country]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitVote = async () => {
    var success = false;
    if (selectedOption) {
         success = addMotionVote(motion._id, votinguser.country, selectedOption, votinguser.confID);
      if (success) {
        // Reset selectedOption after submitting vote
        setSelectedOption('');
        // Set voteSubmitted to true
        setVoteSubmitted(true);
      } else {
        console.error('Failed to submit vote.');
      }
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
          <div className='voteCont'>
            <div>
              <div className='box' style={{ backgroundColor: '#4aff7d' }} onClick={() => handleOptionChange('Yes')}>
                {selectedOption === 'Yes' && (<CloseIcon style={{ fontSize: '4rem' }} />)}
              </div>
              <div className='box' style={{ backgroundColor: '#ff4a4a' }} onClick={() => handleOptionChange('No')}>
                {selectedOption === 'No' && (<CloseIcon style={{ fontSize: '4rem' }} />)}
              </div>
              {abstain && (
                <div className='box' style={{ backgroundColor: '#ffc94a' }} onClick={() => handleOptionChange('Abstain')}>
                  {selectedOption === 'Abstain' && (<CloseIcon style={{ fontSize: '4rem'}} />)}
                </div>
              )}
            </div>
          
            <div className='yesnoabstain'>
              <span className='voteOptions'>Yes</span>
              <span className='voteOptions'>No</span>
              {abstain && (
                <span className='voteOptions'>Abstain</span>
              )}
            
            </div>
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
