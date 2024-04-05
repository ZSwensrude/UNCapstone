import React, { useState , useRef } from "react";
import CoolButton from './CoolButton';
import Countdown from 'react-countdown';

const TimerSpeaker = React.memo(() => {

const [timeSpeaker, setTimeSpeaker] = useState("");
let numInSecondsSpeaker = Number(timeSpeaker) * 60000;
const ref= useRef();
state = { date: Date.now() + numInSecondsSpeaker}


//handlers for both speaker and session timers
handleStartClickSpeaker = (e) => {
    ref.current?.start();
  };

  handlePauseClickSpeaker = (e) => {
    ref.current?.pause();
  }

  handleResetClickSpeaker =(e) => {
    ref.current?.stop();
  }

  const Completionist = () => <span>Time's Up!</span>;

        //used to obtain input from user
        const handleKeyDown = event => {
        
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
              if (hours > 0) {
                return <span>{hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>;
              } else {
                return <span>{minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>;
              }
            }
          };

return (
    <div className="SessionTimerBlock">
            <div className="BackInSessionBlock">
                <h2 className="BackInSessionTitle">Speaker Timer:</h2>
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
                <input id="BackInSessionTime" type="number" value={timeSpeaker} onChange={(e) => setTimeSpeaker(e.target.value)} onKeyDown={handleKeyDown}/>
            </div>
        </div>


        <div className="timerBlock2Buttons">   
            <CoolButton buttonText={"Restart"} buttonColor={'#FF9728'} textColor='white' onClick={handleResetClickSpeaker}/>
            <CoolButton buttonText={"Start"} buttonColor={'#FF9728'} textColor='white' onClick={handleStartClickSpeaker}/>
            <CoolButton buttonText={"Pause"} buttonColor={'#FF9728'} textColor='white' onClick={handlePauseClickSpeaker}/>
        </div>
</div>
);
});

export default TimerSpeaker;