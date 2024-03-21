import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { switchActiveMotion, removeMotion} from "../imports/api/conference.js";

import './DiasComponents.css';

const MotionsDias = ({ aMotionDias, blank }) => {
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('loggedInUser');
        return userString ? JSON.parse(userString) : null;
    };
    const user = getUserFromLocalStorage();


    const handleSetActiveMotion = () => {
        // Call the setActiveMotion function passed from the parent component
        //console.log(aMotionDias._id);
        switchActiveMotion(user.confID, aMotionDias._id);
    };
    
    // Define a handler function to remove the country
    const handleRemoveMotion = () => {
        //console.log("Remove motion:", aMotionDias.content);
        removeMotion({sessionId: user.confID, motionId: aMotionDias._id }); // Call the removeSpeaker function with the correct _id
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
