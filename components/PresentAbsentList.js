import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider, Radio} from "@mui/material";
import './DiasComponents.css';
import flagsData from '../flags.json';
import { updateDelRoll } from "../imports/api/delegates";

const PresentAbsentList = ({ delegate }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [countryName, setCountryName] = useState(delegate.country);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        updateDelRoll(delegate.country, event.target.value);
    };

    // get nicer name cause its not stored in delegate DB
    useEffect( ()=> {
        const countryFromList = flagsData.countries.find( (country) => country.country === delegate.country )
        setCountryName(countryFromList.name);
    }, []) // useEffect with [] means it runs once on component load

    useEffect( () => {
        setSelectedValue(delegate.roleCall === '' ? 'absent' : delegate.roleCall);
    }, [delegate.roleCall])

    return (
        <Paper id={'oneCountry'} elevation={0}>
            <Typography>{countryName ?? "Name"}</Typography>
            <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
            <Radio
                checked={selectedValue === 'absent'}
                onChange={handleChange}
                value="absent"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'absent' }}
                color="orange"
            />
            <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
            <Radio
                checked={selectedValue === 'present'}
                onChange={handleChange}
                value="present"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'present' }}
                color="orange"
            />
            <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
            <Radio
                checked={selectedValue === 'presentAndVoting'}
                onChange={handleChange}
                value="presentAndVoting"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'presentAndVoting' }}
                color="orange"
            />
        </Paper>
    );
}

export default PresentAbsentList;