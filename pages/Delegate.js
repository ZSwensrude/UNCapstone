import React, { useState } from "react";
import Header from "../components/Header";

import './delegate.css'
import SpeakersList from "../components/SpeakersList";
import CoolButton from "../components/CoolButton";
import DelegateToggle from "../components/DelegateToggle";
import CurrentMotion from "../components/CurrentMotion";
import MessageDias from "../components/MessageDias";

// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(true);
  const [motion, setMotion] = useState({});

  const ToggleClick = () => {
    setFormal(!formal);
    console.log("formal", formal);
  };

  return (
    <div id="container">
      <Header version={'delegate'} country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
      <div id="main">
        {/* <Typography variant="h1">Delegate</Typography> */}
        <div id="toggleButton">
          <DelegateToggle formal={formal} onClick={ToggleClick}/>
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
          
          </>
        )}
      </div>
    </div>
  );
};

export default Delegate;
