import { Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";

import './delegate.css'
import SpeakersList from "../components/SpeakersList";
import CoolButton from "../components/CoolButton";

// Placeholder for delegate screen
const Delegate = () => {
  const [formal, setFormal] = useState(true);

  return (
    <>
      <Header version={'delegate'} country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
      <div id="main">
        {/* <Typography variant="h1">Delegate</Typography> */}
        { formal ? (
          // this will be the formal delegate dashboard
          <>
            <SpeakersList />
            <div id="bottomButton">
              <CoolButton buttonColor={'#00DBD4'} buttonText={'view presentation screen'}/>
            </div>
            <div id="rightButton">
              <CoolButton buttonColor={'#999999'} buttonText={'send message to dias'} message={true}/>
            </div>
          </>
        ) : (
          // and here is the informal
          <>
          <p>test</p>
          </>
        )}
      </div>
    </>
  );
};

export default Delegate;
