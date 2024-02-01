import React, { useState } from "react";
import Header from "../components/Header";

import './delegate.css'
import SpeakersList from "../components/SpeakersList";
import CoolButton from "../components/CoolButton";
import DelegateToggle from "../components/DelegateToggle";
import CurrentMotion from "../components/CurrentMotion";
import MessageDias from "../components/MessageDias";
import WorkingGroupsList from "../components/WorkingGroupsList";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Paper, Typography } from "@mui/material";

// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(false);
  const [motion, setMotion] = useState({});
  const [openNotification, setOpenNotification] = useState(false);

  const notificationClick = () => {
    setOpenNotification(!openNotification);
    console.log('clicked notifications')
  };

  const toggleClick = () => {
    setFormal(!formal);
    console.log("formal", formal);
  };

  return (
    <div id="container">
      <Header version={'delegate'} country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
      <div id="main">
        {/* <Typography variant="h1">Delegate</Typography> */}
        <div id="toggleButton">
          <DelegateToggle formal={formal} onClick={toggleClick}/>
        </div>
        { formal ? (
          // this will be the formal delegate dashboard
          <>
            <SpeakersList />
            <div id="motion">
              <CurrentMotion motion={motion}/>
            </div>
            <div id="bottomButton">
              <CoolButton buttonColor={'#00DBD4'} textColor={'white'} buttonText={'view presentation screen'}/>
            </div>
            <div id="rightButton">
              <MessageDias />
            </div>
          </>
        ) : (
          // and here is the informal
          <>
            <WorkingGroupsList />
            <div className="notifications">
              <NotificationsIcon className="notifIcon" onClick={notificationClick}/>
            </div>
            <div className="notification" style={{zIndex:'1'}} >
              { openNotification && (
                <Paper className="notificationContent">
                  <Typography>longer test sentence here</Typography>
                </Paper>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Delegate;
