import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { switchActiveMotion} from "../imports/api/motions.js";

import './DiasComponents.css';

const MotionsDias = ({ aMotionDias }) => {

    const handleSetActiveMotion = () => {
        // Call the setActiveMotion function passed from the parent component
        console.log(aMotionDias._id);
        switchActiveMotion(aMotionDias._id);
    };

    return (
        <Paper id={'oneMotion'} elevation={0}>
            <Typography>{aMotionDias?.content ?? "Motion"}</Typography>
            {/* Add a button to toggle the active state */}
            <Button onClick={handleSetActiveMotion}>
                {aMotionDias.active ? "Active" : "Inactive"}
            </Button>
        </Paper>
    );
}

export default MotionsDias;
