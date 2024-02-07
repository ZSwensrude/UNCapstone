import { Paper, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";


const Presentation = () => {
  return (
    <div>
      <Header />

      <Paper>
        <Typography>
          Presentation Screen!
        </Typography>
      </Paper>
    </div>
  );
};

export default Presentation;