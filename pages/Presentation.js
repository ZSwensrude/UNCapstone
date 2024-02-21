import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Typography } from "@mui/material";
import Header from "../components/Header";
import './presentation.css';
import { conferenceCollection } from "../imports/api/conference";
import SpeakersList from "../components/SpeakersList";
import CurrentSpeaker from "../components/CurrentSpeaker";

const Presentation = () => {
  const [status, setStatus] = useState(true);
  const [code, setCode] = useState('');

  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne();
    if(data) {
      setStatus(data.status);
      setCode(data.sessionID);
    }
  }, []);

  useEffect( () => {
    console.log("status", status);
  }, [status]);

  return (
    <div className="presentationTop">
      <Header version={'blank'}/>
      <div className="welcomeHeader1">
        <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />
        <Typography variant="h6">Welcome to Mac-UN!</Typography>
      </div>
      { status === 'formal' ? (
        <div className="presentationBody">
          <SpeakersList blank={true} />
          <CurrentSpeaker confCode={code} />
        </div>
      ) : (
        <div className="presentationBody">   

        </div>
      )}

    </div>
  );
};

export default Presentation;
