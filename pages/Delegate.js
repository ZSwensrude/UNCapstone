import { Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";

import './delegate.css'
import SpeakersList from "../components/SpeakersList";

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
