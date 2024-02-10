import React from 'react';
import "./StatusBox.css";
import CoolButton from '../CoolButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function StatusBox( { closeModal }) {

    return (
        <div className='statusBackground'>
            <div className='statusContainer'>
            < div className='firstButtons'>
            <FormControl>
            <FormLabel id="radio-buttons-group-label">Change Status?</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="Roll Call"
                name="radio-buttons-group"
            >
                <FormControlLabel value="RollCall" control={<Radio />} label="Roll Call" />
                <FormControlLabel value="Formal" control={<Radio />} label="Formal" />
                <FormControlLabel value="Informal" control={<Radio />} label="Informal" />
                <FormControlLabel value="VotingProcedure" control={<Radio />} label="Voting Procedure" />
            </RadioGroup>
            </FormControl>
            </div>
                <div className='statusButtons'>
                        <CoolButton buttonText={"Cancel"} onClick={() => {closeModal(false);}} buttonColor={'#800000'} textColor='white' />
                        <CoolButton buttonText={"Change"} buttonColor={'#FF9728'} textColor='white' />
                </div>
            </div>
        </div>
    );
}

export default StatusBox;