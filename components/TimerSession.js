import React, { useState, useRef, useEffect } from "react";
import CoolButton from './CoolButton';
import Countdown from 'react-countdown';
import { setTimerStatus, setTimerTime } from "../imports/api/conference";

const TimerSession = ({ version, time, status, confID }) => {
  const [timeSession, setTimeSession] = useState("");
  const numInSecondsSession = time ? Number(time) * 60000 : Number(timeSession) * 60000;
  const ref = useRef();
  const initialTimerStatus = useRef(''); // Store initial timer status

  const handleStartClickSession = () => {
    setTimerStatus(confID, 'start'); // Update timer status in the database
    initialTimerStatus.current = 'start'; // Update initial timer status
    ref.current?.start(); // Start the timer
  };

  const handlePauseClickSession = () => {
    // this does the same thing as reset for whatever reason
    setTimerStatus(confID, 'pause');
    ref.current?.pause();
  };

  const handleResetClickSession = () => {
    setTimerStatus(confID, 'restart');
    ref.current?.stop();
  };

  useEffect( () => {
    if(version === 'Presentation' && time > 0){
      if (status === 'start') 
        ref.current?.start();
      else
        ref.current?.stop();
    }
  }, [status]);

  useEffect(() => {
    setTimerTime(confID, timeSession);
  }, [timeSession]);

  const Completionist = () => <span>Time's Up!</span>;

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      if (hours > 0) {
        return <span>{hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>;
      } else {
        return <span>{minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>;
      }
    }
  };

  return (
    <>
      {version === 'diasHome' && (
        <>
          <div className="SessionTimerBlock">
            <div className="BackInSessionBlock">
              <h2 className="BackInSessionTitle">Back In Session In:</h2>
            </div>
            <div className="Timer">
              <Countdown
                key={numInSecondsSession}
                ref={ref}
                date={Date.now() + numInSecondsSession}
                renderer={renderer}
                autoStart={false}
              />
              <div className="inputForTime">
                <h4 className="timeLabelMins">Enter the time in minutes:</h4>
                <input id="BackInSessionTime" type="number" value={timeSession} onChange={(e) => setTimeSession(e.target.value)} onKeyDown={handleKeyDown} />
              </div>
            </div>
            <div className="timerBlock2Buttons">
              <CoolButton buttonText={"Restart"} buttonColor={'#FF9728'} textColor='white' onClick={handleResetClickSession} />
              <CoolButton buttonText={"Start"} buttonColor={'#FF9728'} textColor='white' onClick={handleStartClickSession} />
              {/* <CoolButton buttonText={"Pause"} buttonColor={'#FF9728'} textColor='white' onClick={handlePauseClickSession} /> */}
            </div>
          </div>
        </>
      )}

      {version === 'Presentation' && (
        <>
          <Countdown
            key={numInSecondsSession}
            ref={ref}
            date={Date.now() + numInSecondsSession}
            renderer={renderer}
            autoStart={false}
          />
        </>
      )}
    </>
  );
};

export default TimerSession;
