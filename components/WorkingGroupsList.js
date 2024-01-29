import React from "react";
import { Typography, Paper } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'
import WorkingGroup from "./WorkingGroup";

const WorkingGroupsList = () => {
  const createGroup = () => {
    console.log("Create group pressed");
  }

  // get working groups from database
  const workingGroups = [
    {
      "countries": [ 
        {"country": 'placeholder', "flag": "/images/flagPlaceholder.png" },
        {"country": 'placeholder', "flag": "/images/flagPlaceholder.png" },
      ],
      "groupName": 'test group',
      "location": "left room",
      "topic": "politics"
    }
  ]

  return (
  <div id='groups'>
      <Paper id='groupsTop' elevation={4}>
        <Typography variant='h4'>
          Working Groups
        </Typography>
      </Paper>
      <Paper id='groupsBody' elevation={4}>
        
        <div className="groupHolder">
          {workingGroups.map( (workingGroup, index) => (
            <WorkingGroup key={workingGroup.groupName + index} workingGroup={workingGroup}/>
          ))}
        </div>

        <div id='joinButton'>
          <CoolButton buttonText='create group' buttonColor={'#FF9728'} textColor={'white'} onClick={createGroup}/>
        </div>
      </Paper>
    </div>
  );
};

export default WorkingGroupsList;