import { Paper, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import './DiasComponents.css';
import { MailOutlined, DraftsOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { updateDMReadStatus } from "../imports/api/dm";

const NotesToDias = ({ aDiasNote }) => {
    const [isRead, setIsRead] = useState(aDiasNote.read); // Initialize the isRead state with the value of the read field from aDiasNote

    const handleClick = () => {
        if (!isRead) { // If the note is unread, update the read status
            updateDMReadStatus(aDiasNote._id, true)
                .then(() => {
                    setIsRead(true); // Update the local state after successful update
                })
                .catch(error => {
                    console.error('Error updating DM read status:', error);
                });
        }
    };

    return (
        <tr>
            <td className=" firstTD">
                <span>{aDiasNote?.from ?? "Country"}</span>
            </td>
            <td className="messageTD">
                <span>{aDiasNote?.content ?? "Note"}</span>
            </td>
            <td className="TDicons" onClick={handleClick}>
                {isRead ? <DraftsOutlined style={{ color: "gray" }} fontSize="medium" /> : <MailOutlined style={{ color: "gray" }} fontSize="medium" />}
            </td>
        </tr>
    );
}

export default NotesToDias;
