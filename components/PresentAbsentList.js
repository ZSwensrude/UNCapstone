import React from "react";
import { Paper, Typography, Divider, Radio} from "@mui/material";
import './DiasComponents.css';

const PresentAbsentList = ({countryList}) => {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
    setSelectedValue(event.target.value);
    };

    return (
        <Paper id={'oneCountry'} elevation={0}>
        <Typography>{countryList?.countryName?? "Name"}</Typography>
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
        color="orange"
        />
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
        color="orange"
        />
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Radio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        value="c"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'C' }}
        color="orange"
        />
        </Paper>
    );
}

export default PresentAbsentList;