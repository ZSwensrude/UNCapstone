// Notification.js
import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import {updateDMReadStatus, dmCollection} from "../imports/api/dm";
import { workingGroupCollection } from "../imports/api/workingGroups";

const Notification = ({ notification, readNotification}) => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const user = getUserFromLocalStorage();
  const [classname, setclassname] = useState("unreadNotification");

  // will join the group in the database
  const joinGroup = () => {
    //console.log("accepted invite to join ", notification.from);
    //console.log("notification._id: ", notification._id);

    //console.log("test: ",dmCollection.findOne({ _id: notification._id }));
  
    // Find the corresponding DM document in the dmCollection
    const dmDocument = dmCollection.findOne({ _id: notification._id });
  
    if (dmDocument) {
      // Extract the working group's _id from the DM document
      const WGid = dmDocument.groupId;

      // check if user is already in group
      const group = workingGroupCollection.findOne({_id: WGid});
      // if they are not, let them join
      if (!group.countries.some(item => item.country === user.country)){
        // Update the working group in the database
        workingGroupCollection.update(
          { _id: WGid }, // Update the working group with the corresponding _id
          { $push: { countries: { country: user.country, name: user.countryName, flagPath: user.flagPath } } }, // Push the user's country to the countries array
          (error, result) => {
            if (error) {
              console.error('Error updating working group:', error);
            } else {
              //console.log('Successfully joined the group:', result);
            }
          }
        );
      }  
    } else {
      console.error('DM document not found for notification ID:', notification._id);
    }
  };
  

  // sends id of read notification to Delegate.js
   // Function to mark the notification as read
   const markAsRead = () => {
    // Update the database
    updateDMReadStatus(notification._id, "true")
      .then(() => {
        readNotification(notification._id); // Update the local state after successful update
      })
      .catch(error => {
        console.error('Error updating DM read status:', error);
      });
  };

  // checks if a notification is read or not and updates its class if it is
  useEffect(() => {
    setclassname(notification.type === 'global' ? "globalNotification" : notification.read === "true" ? "singleNotification" : "unreadNotification");
  }, [notification])

  return (
    <Paper id={classname} elevation={3} >
      <div id="singleNotification1">
        <Typography>From: {notification.from}</Typography>
        {notification.read === "false" && (notification.type !== 'global') && (
          <CoolButton textColor={'white'} buttonColor={'#989898'} buttonText={'mark as read'} onClick={markAsRead} />
        )}
      </div>
      <Paper id="singleNotificationMsg" elevation={0}>
        <Typography>{notification.content}</Typography>
        {notification.type === "invite" && (
          <CoolButton textColor={'white'} buttonColor={'#00DB89'} buttonText={'join'} onClick={joinGroup} />
        )}
      </Paper>
    </Paper>
  );
};

export default Notification;