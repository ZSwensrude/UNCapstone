import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import './presentation.css';
import { conferenceCollection } from "../imports/api/conference";
import SpeakersList from "../components/SpeakersList";
import CurrentSpeaker from "../components/CurrentSpeaker";
import { motionCollection } from "../imports/api/motions.js";
import MotionsDias from "../components/MotionsDias";

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

  const { motionsListDias = [] } = useTracker(() => {
    const handler = Meteor.subscribe('motions');
    const motionsListDias = motionCollection.find().fetch();
    activeMotion = motionCollection.find({ active: true }).fetch();
    return { motionsListDias };
  });

  useEffect( () => {
    console.log("status", status);
  }, [status]);

  return (
    <div className="presentationTop">
      <Header version={'blank'}/>
      <div className="welcomeHeader1">
        <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />
        <Typography style={{ marginTop:'-10px' }} variant="h6">Welcome to Mac-UN!</Typography>
      </div>
      { status === 'formal' ? (
        <div className="presentationBody">
          <SpeakersList blank={true} />
          <CurrentSpeaker confCode={code} />

          <Paper id='presentationMotions'>
            <Typography style={{ marginBottom:'20px' }} variant="h4">Current Motions:</Typography>
            {motionsListDias &&
              motionsListDias.map((aMotionDias, index) => (
                <MotionsDias blank={true} key={`${index}motions`} aMotionDias={aMotionDias} /> 
              ))
            }
          </Paper>
        </div>
      ) : status === 'informal' ? (
        <div className="presentationBody">   

        </div>
      ) : (
        <div id="intructions">
          <Paper id="instructionPaper" >
            <Typography variant="h4">Go to Mac-UN.space to join!</Typography>
            <Typography variant="h4">Choose your delegate country and enter the following</Typography>
            <Typography variant="h4" >conference code: {code}</Typography>
          </Paper>
          <Typography>The conference will begin shortly</Typography>
        </div>
      )}

    </div>
  );
};

export default Presentation;
