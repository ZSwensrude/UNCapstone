// Notification.js
import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';
import { updateDMReadStatus, deleteDMFromDB, conferenceCollection,joinWG  } from "../imports/api/conference"; // Update imports

const Notification = ({ notification, readNotification }) => {
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };

  const user = getUserFromLocalStorage();
  const [classname, setclassname] = useState("unreadNotification");
  const [bgColor, setBGColor] = useState("#FFFFFF");

  const joinGroup = () => {
    const conference = conferenceCollection.findOne({ sessionID: user.confID });
    if (!conference) {
      console.error('Conference not found.');
      return;
    }

    const DM = conference.DMs.find(dm => dm._id === notification._id);
    if (DM) {
      const WGid = DM.groupId;
      //console.log('Joining working group:', WGid);
      //console.log('DM:', DM);

      const result = joinWG({ sessionId: user.confID, groupId: WGid, user }); // Call the joinWG function
  
      if (result === "error") {
        console.error('Failed to join the group');
      } else {
        // Optional: You can add any additional logic here after successfully joining the group
      }
    } else {
        console.error('DM document not found for notification ID:', notification._id);
    }
  };

  const markAsRead = () => {
    updateDMReadStatus(user.confID, notification._id, "true")
      .then(() => {
        readNotification(notification._id);
      })
      .catch(error => {
        console.error('Error updating DM read status:', error);
      });
  };

  const deleteNotif = () => {
    deleteDMFromDB(user.confID,notification._id);
  };

  useEffect(() => {
    setclassname(notification.read === "true" ? "singleNotification" : "unreadNotification");
    setBGColor(notification.type === 'global' ? "#00DB89" : "#FFFFFF");
  }, [notification]);
    //console.log(notification.read === "true" ? "singleNotification" : "unreadNotification");

  return (
    <Paper id={classname} style={{ background: bgColor }} elevation={3} >
      <div id="singleNotification1">
        <Typography>From: {notification.from}</Typography>
        {notification.read === "false" && (notification.type !== 'global') && (
          <CoolButton textColor={'white'} buttonColor={'#989898'} buttonText={'mark as read'} onClick={markAsRead} />
        )}
        {notification.type !== 'global' && (
          <CoolButton textColor={'white'} buttonColor={'#cb0000'} buttonText={'delete'} onClick={deleteNotif} />
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
