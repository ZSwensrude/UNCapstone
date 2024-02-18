import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider, Radio} from "@mui/material";
import './DiasComponents.css';
import flagsData from '../flags.json';
import { updateDelRoll } from "../imports/api/delegates";

const PresentAbsentList = ({ delegate }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [countryName, setCountryName] = useState(delegate.country);
    const [flagPath, setFlagPath] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        updateDelRoll(delegate.country, event.target.value);
    };

    // get nicer name cause its not stored in delegate DB
    useEffect(() => {
        const countryFromList = flagsData.countries.find(country => country.country === delegate.country);
        setCountryName(countryFromList?.name ?? "Name");
        setFlagPath(countryFromList?.flagPath ?? "");
    }, [delegate.country]);

    useEffect(() => {
        setSelectedValue(delegate.roleCall === '' ? 'absent' : delegate.roleCall);
    }, [delegate.roleCall]);

    return (
        <tr >
            <td className="RCcountryInfo">
                <Typography>{countryName}</Typography>
                <div className="countryFlagContainer">
                    {flagPath && <img className="countryFlagRC" src={window.location.origin + flagPath} alt={countryName} title={countryName} />}
                </div>            
        </td>
            <td>
                <Radio
                    checked={selectedValue === 'absent'}
                    onChange={handleChange}
                    value="absent"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'absent' }}
                    color="orange"
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'present'}
                    onChange={handleChange}
                    value="present"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'present' }}
                    color="orange"
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'presentAndVoting'}
                    onChange={handleChange}
                    value="presentAndVoting"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'presentAndVoting' }}
                    color="orange"
                />
            </td>
        </tr>
    );
}

export default PresentAbsentList;
