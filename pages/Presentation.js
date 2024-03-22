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
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
import { green } from "@mui/material/colors";
import CountryVotesMotion from "../components/CountryVotesMotion.js";

const Presentation = () => {
  // Function to retrieve user information from localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  };
  // Get user information from localStorage
  const user = getUserFromLocalStorage();

  const [status, setStatus] = useState(true);
  const [code, setCode] = useState('');
  const [deadlines, setDeadlines] = useState([]);
  const [time, setTime] = useState('');
  const [timerStatus, setTimerStatus] = useState('');
  const [confID, setConfID] = useState('');
  const [motionsListDias, setMotionsListDias] = useState([]);

  useTracker(() => {
    const handler = Meteor.subscribe('conference');
    const data = conferenceCollection.findOne({ sessionID: user.confID });
    if(data) {
      setStatus(data.status);
      setCode(data.sessionID);
      setDeadlines(data?.deadlines);
      setTime(data?.timer.time);
      setTimerStatus(data?.timer.status);
      setConfID(data?._id);
      setMotionsListDias(data?.motions);
    }
  }, []);

  useTracker(() => {
    const handler = Meteor.subscribe('motions');
    const motionsListDias = motionCollection.find().fetch();
    activeMotion = motionCollection.find({ active: true }).fetch();
    setMotionsListDias(motionsListDias)
  }, []);

  /* pie chart and motion vote stuff */

  //counting for pie chart 
  let voteYes = 0;
  let voteNo = 0;
  let voteAbstain = 0;
  let total = 0;
  const votesArray = [];
  let motionName = "";

  //reading from motions list for active motion and counting for pie chart
  motionsListDias?.forEach(function (item) {
    //getting the current active motion
    if (item?.active == true){
        motionName = item?.content //getting the motion name
        //getting the list of countries and counting thier votes
        item?.votes.forEach(function (item1) { 
          votesArray.push(item1);
          total++;
          if (item1?.vote == "Yes") {
              voteYes++;
          }
          else if (item1?.vote == "No") {
              voteNo++;
          }
          else {
              voteAbstain++;
          }
              })
  }})

  const  data = [
    { id: 0, value: (voteYes/total) * 100, label: 'Yes', color: 'green' },
    { id: 1, value: (voteNo/total) * 100, label: 'No', color: 'red' },
    { id: 2, value: (voteAbstain/total) * 100, label: 'Abstain', color: 'yellow' },
  ];
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
            <CountryVotesMotion key={countryName?.countryInfo + index} countryName={countryName}/>
            ))}
            </div>
          </div>

          <div className="motionAndPieBox">
            <div className="VCMButtonBlock">
              <div className="VCMButton">Current Motion</div>
            </div>
            <div className="currentMotionWhiteBlock">
              {motionName}
            </div>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value.toFixed()}%`,
                  arcLabelMinAngle: 10,
                  data,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'black',
                  fontWeight: 'bold',
                },
              }}
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
