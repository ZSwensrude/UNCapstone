import React, { useEffect, useState } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import './presentation.css';
import './DiasHomePageIndex.css';
import { conferenceCollection } from "../imports/api/conference";
import SpeakersList from "../components/SpeakersList";
import CurrentSpeaker from "../components/CurrentSpeaker";
import { motionCollection } from "../imports/api/motions.js";
import MotionsDias from "../components/MotionsDias";
import DeadlineDias from "../components/DeadlinesDias.js";
import TimerSession from "../components/TimerSession.js";
import { PieChart } from '@mui/x-charts';
import { green } from "@mui/material/colors";
import CountryVotesMotion from "../components/CountryVotesMotion.js";

const Presentation = () => {
  const [status, setStatus] = useState(true);
  const [code, setCode] = useState('');
  const [deadlines, setDeadlines] = useState([]);
  const [time, setTime] = useState('');
  const [timerStatus, setTimerStatus] = useState('');
  const [confID, setConfID] = useState('');

  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne();
    if(data) {
      setStatus(data.status);
      setCode(data.sessionID);
      setDeadlines(data?.deadlines);
      setTime(data?.timer.time);
      setTimerStatus(data?.timer.status);
      setConfID(data?._id);
      console.log("test", data?._id)
    }
  }, []);

  const { motionsListDias = [] } = useTracker(() => {
    const handler = Meteor.subscribe('motions');
    const motionsListDias = motionCollection.find().fetch();
    activeMotion = motionCollection.find({ active: true }).fetch();
    return { motionsListDias };
  });

  /* pie chart and motion vote stuff */

  //reading from database
  const { motionfromDB } = useTracker(() => {
    const handler = Meteor.subscribe('motions');
    const motionfromDB = motionCollection.findOne({ active: true }); // Fetch the active motion
    //console.log("The motionfrom DB: ", motionfromDB)
    //console.log("motion name:", motionfromDB?.content)
    return { motionfromDB };
  });

  //counting for pie chart 
  let voteYes = 0;
  let voteNo = 0;
  let voteAbstain = 0;
  const votesArray = [];

  motionfromDB?.votes.forEach(function (item) {
    votesArray.push(item);
  })

  motionfromDB?.votes.forEach(function (item) {
    //console.log(item?.vote);
    
    if (item?.vote == "Yes") {
        voteYes++;
    }
    else if (item?.vote == "No") {
        voteNo++;
    }
    else {
        voteAbstain++;
    }
  });

  console.log("The motionfrom DB: ", motionfromDB)
  console.log("The db array: ", motionfromDB?.votes)
  console.log("The votes: ", votesArray)

  return (
    <div className="presentationTop">
      <Header version={'blank'}/>
      <div className="welcomeHeader1">
        <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />
        <Typography variant="h6">Welcome to Mac-UN!</Typography>
      </div>
      { status === 'formal' ? (
        <div className=" presentationBody">
          <div className="formalbox">
            <SpeakersList blank={true} />
          </div>         
          <div className="formalbox">
            <CurrentSpeaker confCode={code} />
          </div>
          <div className="formalbox " >
            <div id='presentationMotionsBox'>
              <Typography variant="h4">Current Motions:</Typography>
              <div id='presentationMotions'>
              {motionsListDias &&
                motionsListDias.map((aMotionDias, index) => (
                  <MotionsDias blank={true} key={`${index}motions`} aMotionDias={aMotionDias} /> 
                ))
              }
              </div>            
            </div>

          </div>
        </div>
      ) : status === 'informal' ? (
        <div className="presentationBody">
          <div className="formalbox"> 
            <div className="DeadlinesBlock">
              <Typography variant="h4" style={{ fontSize:'2.5rem' }}>Deadlines:</Typography>
              <div className="DeadlinesPresentation">
                {deadlines?.map( (deadline, index) => (
                  <DeadlineDias key={deadline?.deadlineAdded + index + 'deadline'} version={"presentation"} deadline={deadline}/>
                ))}
              </div>    
            </div>
          </div>
          <div className="formalbox" style={{ justifyContent:'center' }}>
            <Typography variant="h2">Back in Session in:</Typography>
            <Paper id="instructionPaper" style={{ background:'white' }}>
              {/* TODO: Put timer here once ayesha done */}
              <div id="TimerPresentation">
                <TimerSession version={"Presentation"} time={time} status={timerStatus} confID={confID} />
              </div>
            </Paper>
          </div>
          <div id='confID' >
            <Typography variant="h1" >Conference code:</Typography>
            <Typography variant="h1" >{code}</Typography>
          </div>
        </div>
      ) : status === 'votingProcedure' ? (
        <div className="presentationBody">   
          {/* put voting procedure presentation screen here */}
        </div>
      ) 
      : status === 'motions' ? (
        <div className="motionBox">   
          <div className="countryVotes">
            <div className="VCMButtonBlock">
              <div className="VCMButton">Votes</div>
            </div>
            <div className="countryVotesBlock">
            {votesArray?.map( (countryName, index) => (
              <CountryVotesMotion key={countryName?.countryInfo + index + 'country'} countryName={countryName}/>
              ))}
            </div>
          </div>

          <div className="motionAndPieBox">
            <div className="VCMButtonBlock">
              <div className="VCMButton">Current Motion</div>
            </div>
            <div className="currentMotionWhiteBlock">
              {motionfromDB?.content}
            </div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: voteYes, label: 'Yes', color: 'green' },
                    { id: 1, value: voteNo, label: 'No', color: 'red' },
                    { id: 2, value: voteAbstain, label: 'Abstain', color: 'yellow' },
                  ],
                },
              ]}
              width={400}
              height={250}
            />
          </div>
        </div>
      ) 
      : (
        <div id="intructions">
          <Paper id="instructionPaper" >
            <Typography variant="h4">Go to Mac-UN.space to join!</Typography>
            <Typography variant="h4">Choose your delegate country and enter the</Typography>
            <Typography variant="h4">following conference code: {code}</Typography>
            <br />
            <br />
            <br />
            <Typography variant="h2">Chrome and Firefox are the only browsers supported</Typography>
            <Typography variant="h2">The conference will begin shortly</Typography>
          </Paper>
        </div>
      )}

    </div>
  );
};

/*        {votesArray?.map( (countriesV, index) => (
  <CountryVotesMotion key={countriesV?.countryInfo + index} CountryVotesMotion={CountryVotesMotion}/>
  ))} */
export default Presentation;
