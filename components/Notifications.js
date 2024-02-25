// Notifications.js
import { Paper, Typography } from "@mui/material";
import React from "react";
import './components.css';
import Notification from "./Nofitication";
import CoolButton from "./CoolButton";

const Notifications = ({ notifications, readNotification }) => {

  const markAsRead = () => {
    notifications.forEach(notification => {
      if( notification.type !== 'global' )
        readNotification(notification._id);
    })
  }

  return (
    <Paper id="notificationContent" >
      <div style={{ display: 'flex', justifyContent:'center'}}>
        <CoolButton textColor={'white'} buttonColor={'#989898'} buttonText={'mark all as read'} onClick={markAsRead} />
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Notification key={`notification-${index}`} notification={notification} readNotification={readNotification} />
        ))
      ) : (
        <Typography className="emptyNotification" >no notifications</Typography>
      )}
    </Paper>
  );
};

export default Notifications;