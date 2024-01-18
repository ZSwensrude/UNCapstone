import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
//import { LinksCollection } from "../imports/api/links";

// Placeholder for delegate screen
const Delegate = () => {
  const [links, setLinks] = useState([]);

  // useTracker(() => {
  //   const linksData = LinksCollection.find().fetch();
  //   setLinks(linksData);
  // }, []);

  return (
    
    <div >
      <Typography variant="h3">Delegate</Typography>
    </div>
  );
};

export default Delegate;
