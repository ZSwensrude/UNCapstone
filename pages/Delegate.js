import { Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";

// Placeholder for delegate screen
const Delegate = () => {

  return (
    <div >
      <Header country={"Ireland"} flagPath={'/images/flagPlaceholder.png'} />
      <Typography variant="h1">Delegate</Typography>
    </div>
  );
};

export default Delegate;
