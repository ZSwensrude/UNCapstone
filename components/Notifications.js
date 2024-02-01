import { Paper, Typography } from "@mui/material";
import React from "react";
import './components.css';
import Notification from "./Nofitication";

const Notifications = ({ notifications, readNotification }) => {
  return (
    <Paper id="notificationContent" >
      {notifications.length > 1 ? (
        notifications.map( (notification, index) => (
          <Notification key={`notification-${index}`} notification={notification} readNotification={readNotification} />
        ))
      ) : (
        <Typography className="emptyNotification" >no notifications</Typography>
      )}
    </Paper>
  );
};

export default Notifications;