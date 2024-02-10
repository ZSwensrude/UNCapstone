import React from "react";
import { Paper, Typography} from "@mui/material";
import './DiasComponents.css';

const MotionsDias = ({aMotionDias}) => {

    return (
        <Paper id={'oneMotion'} elevation={0}>
        <Typography>{aMotionDias?.motionChosen?? "Motion"}</Typography>
        </Paper>
    );
}

export default MotionsDias;