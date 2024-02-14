import React from "react";
import { Paper, Typography} from "@mui/material";
import './DiasComponents.css';
import CloseIcon from '@mui/icons-material/Close';

const DeadlineDias = ({aDeadlineDias, version}) => {

    return (
        <>
        { version === 'diasHome' && (
            <>
        <Paper id={'oneDeadline'} elevation={0}>
        <Typography>{aDeadlineDias?.deadlineAdded?? "Deadline"}</Typography>
        <CloseIcon style={{ color: "red" }} fontSize="medium"/>
        </Paper>
        </>
        ) }

        { version === 'informalScreen' && (
        <>
        <Paper id={'oneDeadline'} elevation={0}>
        <Typography>{aDeadlineDias?.deadlineAdded?? "Deadline"}</Typography>
        </Paper>
        </>
        )}
        </>
    );
}

export default DeadlineDias;