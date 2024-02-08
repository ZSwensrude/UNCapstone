import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Typography, Paper, Divider } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'
import WorkingGroup from "./WorkingGroup";
import MessageGroup from "./MessageGroup";
import CreateGroup from "./CreateGroup";
import { workingGroupCollection } from "../imports/api/workingGroups";


const WorkingGroupsList = () => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();

    
  const [group, setGroup] = useState({});

  const chooseGroup = (newGroup) => {
 // Toggle the group state
  if (newGroup.name === group.name) {
    // If the selected group is the same as the current group, close it
    setGroup({});
  } else {
    // Otherwise, set the new group
    setGroup(newGroup);
  }  };

  // const createGroup = () => {
  //   // create group and send to database
  //   // we need to get the information from the text boxes, i think as a state variable
  //   console.log("Create group pressed");
  // }

  const sendMessage = () => {
    if (Object.keys(group).length > 0) {
      console.log("send message to group: ", group.groupName);
    }
  }
   // Use useTracker to reactively fetch data from the speakers collection
   const { workingGroupsDB } = useTracker(() => {
    const handler = Meteor.subscribe('workingGroups');
    const workingGroupData = workingGroupCollection.find().fetch(); 
    //console.log("working groups",workingGroupData);
    return { workingGroupsDB: workingGroupData };
  });

  // Function to check if user's country is in the group's countries
  const isInUserCountry = (group) => {
    if (!user || !user.country) return false;
    return group.countries.some(country => country.country === user.country);
  }

  return (
    <>
      <div id='groups'>
        <Paper id='groupsTop' elevation={4}>
          <Typography variant='h4'>
            Working Groups
          </Typography>
        </Paper>
        <Paper id='groupsBody' elevation={4}>
          
          <div className="groupHolder">
            {workingGroupsDB.map( (workingGroup, index) => (
              <WorkingGroup 
                key={workingGroup.name + index} 
                workingGroup={workingGroup} 
                chooseGroup={chooseGroup}
                isInUserCountry={isInUserCountry(workingGroup)} // check if user in DB group
              />
            ))} 
          </div>

          <div id='joinButton'>
            <CreateGroup />
          </div>
        </Paper>
      </div>

      <div>
        { Object.keys(group).length > 0 && (
          <>
            <Paper id='groupHolder' className={isInUserCountry(group) ? 'userInWorkingGroup' : ''}>              
              <div id='groupDetails'>
                <Typography>{group?.name ?? "Group"}</Typography>
                <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
                {group?.countries?.map((country, index) => (
                  <img className="workingGroupFlag" key={country.country + index} src={window.location.origin + `${country.flagPath}` } alt={country.name} />
                ))}
              </div>
              <hr className='blackLine'/>
              <Typography >Location: {group.location}</Typography>
              <Typography >Topic: {group.topic}</Typography>
              <div className="groupMessage">
                <MessageGroup onClick={sendMessage} countries={group.countries} groupname={group.name} />
              </div>
            </Paper>
          </>
        ) }
      </div>
    </>
  );
};

export default WorkingGroupsList;