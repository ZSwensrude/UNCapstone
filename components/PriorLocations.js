import React from "react";
import { Paper, Typography, Divider} from "@mui/material";
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
        <Divider orientation="vertical"  flexItem sx={{ marginRight:'10px', marginLeft:'10px' }} />
        <Typography>{conferenceLocation?.cGroup?? "Group"}</Typography>
        </Paper>
        </>
        )
        }
        </>
    );
}

export default PriorLocations;