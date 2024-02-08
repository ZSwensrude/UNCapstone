import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'

const WorkingGroup = ({ workingGroup, chooseGroup, isInUserCountry }) => {
  //handles when the user clicks on view group button
  const onClick = () => {
    console.log("viewing group ", workingGroup?.name)
    chooseGroup(workingGroup ?? {});
  }

  return(
    <Paper id={'workingGroupBack'} elevation={0} className={isInUserCountry ? 'userInWorkingGroup' : ''}>
      <Typography>{workingGroup?.name ?? "Group"}</Typography>
      <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />

      {workingGroup?.countries?.map( (country, index) => (
        <img className="workingGroupFlag" key={country.country + index} src={window.location.origin + `${country.flagPath}` } alt={country.name} />
      ))}
      
      <div className="workingGroupButton">
        <CoolButton textColor={'white'} buttonText={'view'} buttonColor={'#00DB89'} onClick={onClick}/>
      </div>
    </Paper>
  );
};

export default WorkingGroup;
