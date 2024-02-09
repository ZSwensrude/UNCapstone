import React from "react";
import { Paper, Typography} from "@mui/material";
import './DiasComponents.css';
import CloseIcon from '@mui/icons-material/Close';

const DeadlineDias = ({aDeadlineDias}) => {

    return (
        <Paper id={'oneDeadline'} elevation={0}>
        <Typography>{aDeadlineDias?.deadlineAdded?? "Deadline"}</Typography>
        <CloseIcon style={{ color: "red" }} fontSize="medium"/>
        </Paper>
    );
}

export default DeadlineDias;