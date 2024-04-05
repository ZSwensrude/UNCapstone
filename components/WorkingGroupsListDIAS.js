import React, { useEffect, useState, useReducer } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Typography, Paper, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css'
import WorkingGroup from "./WorkingGroup";
import MessageGroup from "./MessageGroup";
import CreateGroup from "./CreateGroup";
import InviteGroup from './InviteGroup';
import { conferenceCollection, deleteWG, updateWG } from "../imports/api/conference";
import flagsData from '../flags.json';


const WorkingGroupsListDIAS = ({ }) => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [group, setGroup] = useState({});

  const chooseGroup = (newGroup) => {
    //console.log("CHOOSE GROUP");
    setGroup(newGroup);
    setDialogOpen(true);
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
    setWorkingGroupsDB(data?.workingGroups);
  }, []);

  const handleInvite = (group) => {
    // Logic to handle inviting users to the group
    //console.log("Invite users to the group: ", group.name);
    // You can perform any additional actions here, such as opening a modal or sending notifications
  };
  const deleteGroup = () => {
    if (group._id) { // Check if group id exists
      const groupId = group._id;
      //console.log("Deleting group with ID: ", groupId);

      // Call the deleteWG function from workingGroupCollection
      deleteWG(user.confID, groupId)
        .then((result) => {
          //console.log('Successfully deleted the group:', result);
          // Additional logic after successful deletion
        })
        .catch((error) => {
          console.error('Error deleting working group:', error);
        });
    } else {
      console.error('Group id not found');
    }
    setGroup({});
};



  // Function to get the country name and flag path based on the country code
  const getCountryInfo = (countryCode) => {
    if (!countryCode || !countryCode.country) return null; // Check if countryCode is valid
    const countryObject = flagsData.countries.find(country => country.country === countryCode.country);
    //console.log(countryObject);
    if (!countryObject) {
      console.error(`Flag not found for country: ${countryCode.country}`);
      return null;
    }

    const { flagPath, country, name } = countryObject;
    // const isCurrentUser = user && country.toLowerCase() === user.country.toLowerCase();
    // const classNames = isCurrentUser ? 'currentUser' : '';

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
            {workingGroupsDB?.map((workingGroup, index) => (
              <WorkingGroup
                Dias={true}
                key={index + "wg" + workingGroup._id} // Assuming `_id` is a unique identifier for each working group
                workingGroup={workingGroup}
                chooseGroup={chooseGroup}
                isInUserCountry={false}
              />
            ))}

          </div>
        </div>
      </div>

      <div>
        {Object.keys(group).length > 0 && (
          <>
            <Dialog className="dialogWG" open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle className="groupName">{group?.name ?? "Group"}</DialogTitle>
              <DialogContent>
                <div id='groupDetails'>
                  <Divider orientation="vertical" flexItem sx={{ marginRight: '10px', marginLeft: '10px' }} />
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
                <hr className='blackLine' />
                <Typography >Location: {group.location}</Typography>
                <Typography >Topic: {group.topic}</Typography>

              </DialogContent>
              <DialogActions className="WGbuttons">
                <CoolButton buttonColor={'red'} textColor={'white'} buttonText={'Delete'} onClick={deleteGroup} />
                <CoolButton buttonColor={'#00DB89'} textColor={'white'} buttonText={'Close'} onClick={() => setGroup({})} />

              </DialogActions>
            </Dialog>
          </>
        )}

      </div>
    </>
  );
};

export default WorkingGroupsListDIAS;
