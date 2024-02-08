
// Notification.js
import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import {updateDMReadStatus} from "../imports/api/dm";

const Notification = ({ notification, readNotification }) => {
  const [classname, setclassname] = useState("unreadNotification");

  // will join the group in the database
  const joinGroup = () => {
    // figure out how to send the group
    console.log("accepted invite to join ", notification.from)
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
    setclassname(notification.read === "true" ? "singleNotification" : "unreadNotification");
  }, [notification])

  return (
    <Paper id={classname} elevation={3} >
      <div id="singleNotification1">
        <Typography>From: {notification.from}</Typography>
        {notification.read === "false" && (
          <CoolButton textColor={'white'} buttonColor={'#989898'} buttonText={'mark as read'} onClick={markAsRead} />
        )}
      </div>
      <Paper id="singleNotificationMsg" elevation={0}>
        <Typography>{notification.content}</Typography>
        {notification.type === "group" && (
          <CoolButton textColor={'white'} buttonColor={'#00DB89'} buttonText={'join'} onClick={joinGroup} />
        )}
      </Paper>
    </Paper>
  );
};

export default Notification;