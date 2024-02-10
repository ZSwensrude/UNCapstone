import React from "react";
import { Paper, Typography} from "@mui/material";
import './DiasComponents.css';

const PriorLocations = ({conferenceLocation, version}) => {

    return (
        <>
        { version === 'dias' && (
            <>
        <Paper id={'onePriorLocation'} elevation={0}>
        <Typography>{conferenceLocation?.cLocation?? "Location"}</Typography>
        </Paper>
        </>
        ) }

        { version === 'diasHome' && (
        <>
            <Paper id={'onePriorLocation'} elevation={0}>
        <Typography>{conferenceLocation?.cLocation?? "Location"}</Typography>
        </Paper>
        </>
        )
        }
        </>
    );
}

export default PriorLocations;