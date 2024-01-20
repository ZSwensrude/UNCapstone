import { Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";

import './delegate.css'
import SpeakersList from "../components/SpeakersList";
import CoolButton from "../components/CoolButton";
import DelegateToggle from "../components/DelegateToggle";

// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(true);

  return (
    <div id="container">
      <Header version={'delegate'} country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
      <div id="main">
        {/* <Typography variant="h1">Delegate</Typography> */}
        { formal ? (
          // this will be the formal delegate dashboard
          <>
            <SpeakersList />
            <div>
              <DelegateToggle />
            </div>
            <div id="bottomButton">
              <CoolButton buttonColor={'#00DBD4'} textColor={'white'} buttonText={'view presentation screen'}/>
            </div>
            <div id="rightButton">
              <CoolButton buttonColor={'#999999'} textColor={'white'} buttonText={'send message to dias'} message={true}/>
            </div>
          </>
        ) : (
          // and here is the informal
          <>
          <p>test</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Delegate;
