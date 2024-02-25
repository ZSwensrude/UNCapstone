import React, { useState , useRef } from "react";
import CoolButton from './CoolButton';
import Countdown from 'react-countdown';

const TimerSession = () => {

const [timeSession, setTimeSession] = useState("");
let numInSecondsSession = Number(timeSession) * 60000;
const ref= useRef();
state = { date: Date.now() + numInSecondsSession}

//handlers for both speaker and session timers
handleStartClickSession = (e) => {
    ref.current?.start();
  };

  handlePauseClickSession = (e) => {
    ref.current?.pause();
  }

  handleResetClickSession =(e) => {
    ref.current?.stop();
  }

  const Completionist = () => <span>Time's Up!</span>;

        //used to obtain input from user
        const handleKeyDown = event => {
            console.log(event.key);
        
            if (event.key === 'Enter') {
              event.preventDefault();
    }
  };

        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a completed state
              return <Completionist />;
            } else {
              // Render a countdown
              return <span>{hours}:{minutes}:{seconds}</span>;
            }
          };

return (
    <div className="SessionTimerBlock">
            <div className="BackInSessionBlock">
                <h2 className="BackInSessionTitle">Back In Session In:</h2>
            </div>
        <div className="Timer">
            <Countdown 
            key={this.state.date}
            ref={ref}
            date={this.state.date}
            renderer={renderer}
            autoStart={false}
            />
            <div className="inputForTime">
                <h4 className="timeLabelMins">Enter the time in minutes:</h4>
                <input id="BackInSessionTime" type="number" value={timeSession} onChange={(e) => setTimeSession(e.target.value)} onKeyDown={handleKeyDown}/>
            </div>
        </div>


        <div className="timerBlock2Buttons">   
            <CoolButton buttonText={"Restart"} buttonColor={'#FF9728'} textColor='white' onClick={handleResetClickSession}/>
            <CoolButton buttonText={"Start"} buttonColor={'#FF9728'} textColor='white' onClick={handleStartClickSession}/>
            <CoolButton buttonText={"Pause"} buttonColor={'#FF9728'} textColor='white' onClick={handlePauseClickSession}/>
        </div>
</div>
);
};

export default TimerSession;