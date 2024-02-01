import React, {useEffect, useState} from "react";
import { Paper, Typography } from "@mui/material";
import CoolButton from "./CoolButton";
import './components.css';

const Notification = ({ notification, readNotification }) => {
  const [classname, setclassname] = useState("unreadNotification");

  // will join the group in the database
  const joinGroup = () => {
    // figure out how to send the group
    console.log("accepted invite to join ", notification.sender)
  };

  // sends id of read notification to Delegate.js
  const doRead = () => {
    readNotification(notification.id);
  }

  // checks if a notification is read or not and updates its class if it is
  useEffect( () => {
    setclassname(notification.read ? "singleNotification" : "unreadNotification" ); 
  }, [notification])

  return(
    <Paper id={classname} elevation={3} >
      <div id="singleNotification1">
        <Typography>From: {notification.sender}</Typography>
        {!notification.read && (
            <CoolButton textColor={'white'} buttonColor={'#989898'} buttonText={'mark as read'} onClick={doRead} />
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