import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'

const WorkingGroup = ({ workingGroup }) => {
  const onClick = () => {
    console.log("viewing group ", workingGroup?.groupName)
  }

  /*for some reason the border radius style is no longer working style={{ borderRadius:'30px' }}*/

  return(
    <Paper id="workingGroupBack" >
      <Typography>{workingGroup?.groupName ?? "Group"}</Typography>
      <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
      {workingGroup?.countries?.map( (country, index) => (
        <img className="workingGroupFlag" key={country.country + index} src={window.location.origin + `${country.flag}` } alt='United Nations Logo' />
      ))}
      <div className="workingGroupButton">
        <CoolButton textColor={'white'} buttonText={'view'} buttonColor={'#00DB89'} onClick={onClick}/>
      </div>
    </Paper>
  );
};

export default WorkingGroup;