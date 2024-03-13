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
import { motionCollection, insertMotion } from "../imports/api/motions";
import { dmCollection, insertDM, updateDMReadStatus } from "../imports/api/dm";
import flags from '../flags.json';
import { conferenceCollection } from "../imports/api/conference";



// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(true);
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
    let dmData = dmCollection.find({ to: user.country }, { sort: { createdAt: -1 } }).fetch(); // Filter by country
    let diasDms = dmCollection.find({ to: 'delegates' }, { sort: { createdAt: -1 } }).fetch();
    if (diasDms.length > 0 ) {
      dmData = [...diasDms, ...dmData]; // add global dms
    }
    return { dms: dmData };
  });

  const toPresentation = () => {
    // open new window with presentation screen
    window.open('/presentation')
  };

  const toFeedbackForm = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfxTM55mIYjlHyE0rPgtVEPv-q1r0mF4qprj9EUdsoMeBU4cw/viewform?usp=sf_link')
  };

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
    setUnreadNotifications(dms.some(notification => notification.read === "false"));
  }, [dms]);

  const [feedback, setFeedback] = useState(false);
  const [motionfromDB, setMotionFromDB] = useState(null);
  
  //DB Communication - live pull on any change in table
  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne({ sessionID: user.confID });
    
    const dbFeedback = (data === undefined) ? false : data.feedback; 
    const motion = (data === undefined) ? null : data.motions.find((motion) => motion.active === true);

    setFeedback(dbFeedback);
    setMotionFromDB(motion);
  }, []);

  // Function to get the country name from flags.json
  const getCountryName = (countryCode) => {
    const country = flags.countries.find(c => c.country === countryCode);
    return country ? country.name : null;
  };
   // Get the country name from the flags.json file
   const countryName = getCountryName(user.country);

  return (
    <div className="containerDelegate">
      <Header version={'delegate'} country={(user.country)} />
      {/* <Header version={'delegate'} country={countryName} /> */}
        <div id="toggleButton">
          <DelegateToggle formal={formal} onClick={toggleClick} />
        </div>
      <div id="main " className="delegateHome">
       
        {formal ? (
          // this will be the formal delegate dashboard
          <>
              <SpeakersList />
                   
            {/* Conditionally render CurrentMotion if there is an active motion */}
            <div id="motion">
              {/* <CurrentMotion motion={motionfromDB} country={countryName} abstain={true} /> */}
              <CurrentMotion motion={motionfromDB} country={countryName} abstain={motionfromDB?.abstain} user={user.country} />
            </div>
          
          </>
        ) : (
          // and here is the informal
          <>
            <WorkingGroupsList openNotification={openNotification} setOpenNotification={setOpenNotification} />
            <div className="notifications">
              {unreadNotifications ? (
                <NotificationsActiveIcon className="notifIcon" style={{ fontSize: '56px', color: '#cb0000' }} onClick={notificationClick} />
              ) : (
                <NotificationsIcon className="notifIcon" style={{ fontSize: '56px' }} onClick={notificationClick} />
              )}
            </div>
            <div className="notifications" style={{ zIndex: '1' }} >
              {openNotification && (
                <Notifications notifications={dms} readNotification={readNotification} />
              )}
            </div>
          </>
        )}
      </div>
      <div id="bottomButton">
              <CoolButton onClick={toPresentation} buttonColor={'#00DBD4'} textColor={'white'} buttonText={'view presentation screen'} />
            {/* </div> */}
            {/* <div id="rightButton"> */}
              <MessageDias />
              {feedback && <CoolButton onClick={toFeedbackForm} buttonColor={'#6600DB'} textColor={'white'} buttonText={"give feedback! :)"} />}
            </div>
    </div>
  );
};

export default Delegate;
