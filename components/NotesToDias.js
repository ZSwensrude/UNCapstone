import { Paper, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import './DiasComponents.css';
import { MailOutlined, DraftsOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { updateDMReadStatus, conferenceCollection } from "../imports/api/conference";
import flagsData from '../flags.json';

const NotesToDias = ({ aDiasNote }) => {
    const [isRead, setIsRead] = useState(aDiasNote.read); // Initialize the isRead state with the value of the read field from aDiasNote
    const [countryName, setCountryName] = useState('');
    const [flagPath, setFlagPath] = useState('');

        // get nicer name cause its not stored in delegate DB
        useEffect(() => {
            const countryFromList = flagsData.countries.find(country => country.country === aDiasNote.from);
            setCountryName(countryFromList?.name ?? "Name");
            setFlagPath(countryFromList?.flagPath ?? "");
            setIsRead(aDiasNote.read);
        }, [aDiasNote]);

        const getUserFromLocalStorage = () => {
            const userString = localStorage.getItem('loggedInUser');
            return userString ? JSON.parse(userString) : null;
        };
        const user = getUserFromLocalStorage();

        const handleClick = () => {    
            if (isRead === "false") { // Check if the note is unread
                //console.log("updated read status");
                updateDMReadStatus(user.confID, aDiasNote._id, "true")
                    .then(() => {
                        setIsRead(true); // Update the local state after successful update
                    })
                    .catch(error => {
                        console.error('Error updating DM read status:', error);
                    });
            }
        };
        
   // Subscribe to conference collection for changes in DMs list
   useTracker(() => {
    Meteor.subscribe('conference');
}, []);


    return (
        <tr>
            <td className=" firstTD">
                <span>{ countryName ?? "Country"}</span>
                <div className="DMflagCont">
                    {flagPath && <img className="countryFlagDM" src={window.location.origin + flagPath} alt={countryName} title={countryName} />}
                </div>
            </td>
            <td className="messageTD">
                {/* <div className="messageDiv"> */}
                <span>{aDiasNote?.content ?? "Note"}</span>
                {/* </div> */}
            </td>
            <td className="TDicons" onClick={handleClick}>
                {aDiasNote.read === "false" ? <MailOutlined style={{ color: "gray" }} fontSize="medium" /> : <DraftsOutlined style={{ color: "gray" }} fontSize="medium" />}
            </td>
        </tr>
    );
}

export default NotesToDias;
