import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { switchActiveMotion, removeMotion} from "../imports/api/motions.js";

import './DiasComponents.css';

const MotionsDias = ({ aMotionDias, blank }) => {

    const handleSetActiveMotion = () => {
        // Call the setActiveMotion function passed from the parent component
        //console.log(aMotionDias._id);
        switchActiveMotion(aMotionDias._id);
    };
    
    // Define a handler function to remove the country
    const handleRemoveMotion = () => {
        //console.log("Remove motion:", aMotionDias.content);
        removeMotion({ _id: aMotionDias._id }); // Call the removeSpeaker function with the correct _id
    };

    return (
        <Paper id={'oneMotion'} elevation={0}> 
        {!blank && (
            <Button onClick={handleSetActiveMotion}>
                {aMotionDias.active ? "Active" : "Inactive"}
            </Button>
        )}

            <Typography className="motionContent">{aMotionDias?.content ?? "Motion"}</Typography>
           {!blank && ( 
            <button className="DeleteMotion" onClick={handleRemoveMotion}>X</button>
           )}
        </Paper>
    );
}

export default MotionsDias;
