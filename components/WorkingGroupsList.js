import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Typography, Paper, Divider } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'
import WorkingGroup from "./WorkingGroup";
import MessageGroup from "./MessageGroup";
import CreateGroup from "./CreateGroup";
import InviteGroup from './InviteGroup';
import flagsData from '../flags.json';
import { conferenceCollection, joinWG,removeFromWG } from "../imports/api/conference";


const WorkingGroupsList = ({ openNotification, setOpenNotification, Dias}) => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();

  const [group, setGroup] = useState({});

  useEffect( ()=>{
    if (openNotification) 
      setGroup({});
  }, [openNotification] );

  const chooseGroup = (newGroup) => {
 // Toggle the group state
  if (newGroup.name === group.name) {
    // If the selected group is the same as the current group, close it
    setGroup({});
  } else {
    // Otherwise, set the new group
    setGroup(newGroup);
    setOpenNotification(false);
  }  };

  const inviteToGroup = () => {
    // Logic to handle inviting users to the group
    //console.log("Invite users to the group: ", group.name);

  };

  const sendMessage = () => {
    if (Object.keys(group).length > 0) {
      //console.log("send message to group: ", group.groupName);
    }
  }

  const [workingGroupsDB, setWorkingGroupsDB] = useState([]);
  
  // Use useTracker to reactively fetch data from the speakers collection
  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne({ sessionID: user.confID });

    const workingGroupData = (data === undefined) ? [] : data.workingGroups;

    setWorkingGroupsDB(workingGroupData);
  }, []);

  const removeFromGroup = () => {
    if (group._id) {
      const WGid = group._id;
  
      const result = removeFromWG({ sessionId: user.confID, groupId: WGid, user }); // Call the removeFromWG function
  
      if (result === "error") {
        console.error('Failed to remove from the group');
      }
    } else {
      console.error('Group id not found');
    }
    setGroup({});
  };
  const handleInvite = (group) => {
    // Logic to handle inviting users to the group
    //console.log("Invite users to the group: ", group.name);
    // You can perform any additional actions here, such as opening a modal or sending notifications
  };

  const joinGroup = () => {
    if (group._id) {
      const WGid = group._id;
      console.log("WGID: ", WGid);
  
      const result = joinWG({ sessionId: user.confID, groupId: WGid, user }); // Call the joinWG function
  
      if (result === "error") {
        console.log('Failed to join the group');
      } else {
        // Optional: You can add any additional logic here after successfully joining the group
      }
    } else {
      console.log('Group id not found');
    }
    setGroup({});
  };

// Function to check if user's country is in the group's countries
const isInUserCountry = (group) => {
  if (!group || !group.countries) return false; // Add null here
  if (!user || !user.country) return false;
  return group.countries.some(country => country.country === user.country);
}
// Function to get the country name and flag path based on the country code
const getCountryInfo = (countryCode) => {
  if (!countryCode || !countryCode.country) return null; // Check if countryCode is valid
  const countryObject = flagsData.countries.find(country => country.country.toLowerCase() === countryCode.country.toLowerCase());
  //console.log(countryObject);
  if (!countryObject) {
    console.error(`Flag not found for country: ${countryCode.country}`);
    return null;
  }

  const { flagPath, country, name } = countryObject;
  const isCurrentUser = user && country.toLowerCase() === user.country.toLowerCase();
  const classNames = isCurrentUser ? 'currentUser' : '';

  return { flagPath, country, name };
};



  return (
    <>
      <div id='groups'>
        <span id='groupsTop' elevation={4}>
          <Typography variant='h4'>
            Working Groups
          </Typography>
        </span>
        <div id='groupsBody' elevation={4}>
          
          <div className="groupHolder">
          {workingGroupsDB.map((workingGroup, index) => (
            <WorkingGroup 
            Dias ={false}
              key={ index + "wg" + workingGroup._id} // Assuming `_id` is a unique identifier for each working group
              workingGroup={workingGroup} 
              chooseGroup={chooseGroup}
              isInUserCountry={isInUserCountry(workingGroup)} 
            />
          ))}

          </div>
        </div> 
        <div id='joinButton'>
            <CreateGroup />
          </div>
      </div>

      <div className="WGpopup">
        { Object.keys(group).length > 0 && (
          <>
           <Paper id='groupHolder' className={isInUserCountry(group) ? 'userInWorkingGroup' : ''}>              
              <div id='groupDetails'>
                <Typography>{group?.name ?? "Group"}</Typography>
                <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
                {group?.countries?.map((countryCode, index) => {
                  const countryInfo = getCountryInfo(countryCode);
                  if (countryInfo) {
                    return (
                      <img id='itemflag' key={index + window.location.origin} src={window.location.origin + countryInfo.flagPath} alt={`Flag of ${countryInfo.country}`} title={countryInfo.name} />
                    );
                  } else {
                    return null; // Handle if country info is not found
                  }
                })}
              </div>
              <hr className='blackLine'/>
              <Typography >Location: {group.location}</Typography>
              <Typography >Topic: {group.topic}</Typography>
              <div className="groupMessage">
              <MessageGroup
                  onClick={sendMessage}
                  countries={group.countries}
                  fromname={user.country}
                  groupname={group.name}
                />                
                {/* Show the invite button only if the user's country is in the group */}
                {isInUserCountry(group) && (
                  <>
                    <CoolButton buttonColor={'#FF0000'} textColor={'white'} buttonText={'leave'} onClick={removeFromGroup} />
                    <InviteGroup onInvite={handleInvite} group={group} />
                  </>
                )}
                {!isInUserCountry(group) && (
                  <>
                    <CoolButton buttonColor={'#00DB89'} textColor={'white'} buttonText={'join'} onClick={joinGroup} />
                  </>
                )}
              </div>
            </Paper>
          </>
        ) }

      </div>      
    </>
  );
};

export default WorkingGroupsList;