//Delegate.js
import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import Header from "../components/Header";
import './delegate.css'
import SpeakersList from "../components/SpeakersList";
import CoolButton from "../components/CoolButton";
import DelegateToggle from "../components/DelegateToggle";
import CurrentMotion from "../components/CurrentMotion";
import MessageDias from "../components/MessageDias";
import WorkingGroupsList from "../components/WorkingGroupsList";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Notifications from "../components/Notifications";
import {motionCollection, insertMotion} from "../imports/api/motions";
import { dmCollection, insertDM, updateDMReadStatus} from "../imports/api/dm";


// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(true);
  const [motion, setMotion] = useState({});
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(false);
   // Function to retrieve user information from localStorage
   const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const user = getUserFromLocalStorage();

  // handles main formal/informal state
  const toggleClick = () => {
    setFormal(!formal);
  };
  
  // handles when the notification icon is clicked
  const notificationClick = () => {
    setOpenNotification(!openNotification);
  };

  //get notifications from DMs
  //Use useTracker to reactively fetch data from the collection
  const { dms } = useTracker(() => {
    const handler = Meteor.subscribe('DMs');
    const dmData = dmCollection.find({ to: user.country }, { sort: { createdAt: -1 } }).fetch(); // Filter by country
    //console.log("DM data: /n",dmData)
    return { dms: dmData };
  });

 // handles when read notification is pressed, updates notification in the database
const readNotification = (id) => {
  // Update the read status in the database
  updateDMReadStatus(id, "true")
    .then(() => {
      // Update the local state after successful update
      setNotifications(notifications.map(notification => {
        if (notification._id === id) {
          return { ...notification, read: true };
        }
        return notification;
      }));
    })
    .catch(error => {
      console.error('Error updating notification read status:', error);
    });
  }
  // checks if there are any unread notifications, is used to update the notification icon
  useEffect(() => {
    setUnreadNotifications(dms.some(notification => notification.read==="false"));
    //console.log("unreadNotifications:",unreadNotifications );
  }, [dms]);

  const { motionfromDB } = useTracker(() => {
    const handler = Meteor.subscribe('motions');
    const motionfromDB = motionCollection.find({ active: 'true' }).fetch();   
     
    return { motionfromDB };
  });
  
  
  return (
    <div id="container">
    <Header version={'delegate'} country={(user.country)} flagPath={`/images/flags/${user.country}.png`} />

      <div id="main">
        <div id="toggleButton">
          <DelegateToggle formal={formal} onClick={toggleClick}/>
        </div>
        { formal ? (
          // this will be the formal delegate dashboard
          <>
            <SpeakersList />

              {/* Conditionally render CurrentMotion if there are active motions */}
              <div id="motion">
                <CurrentMotion motion={motionfromDB} />
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
              {unreadNotifications ? (
                <NotificationsActiveIcon className="notifIcon" style={{fontSize:'56px', color:'#cb0000'}} onClick={notificationClick}/>
              ) : (
                <NotificationsIcon className="notifIcon" style={{fontSize:'56px'}} onClick={notificationClick}/>
              )}
            </div>
            <div className="notifications" style={{zIndex:'1'}} >
              { openNotification && (
                <Notifications notifications={dms} readNotification={readNotification} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Delegate;
