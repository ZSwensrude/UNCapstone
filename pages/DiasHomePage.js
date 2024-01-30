import { Typography, Paper } from "@mui/material";
import React from "react";
import './DiasHomePageIndex.css';
import '../components/components.css';
import CoolButton from "../components/CoolButton";
import Header from "../components/Header";
import { useNavigate  } from 'react-router-dom';

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

// Placeholder for Dias screen
const DiasHome = () => {
  return (
    <div className="HomePageDias">

        <div className="diasBar">
        <Paper id='logoback' elevation={0}>
            <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
        </Paper>
        <button className="tablinks" onClick={() => openTab(event,'RollCall')}>Roll Call</button>
        <button className="tablinks" onClick={() => openTab(event,'Formal')}>Formal</button>
        <button className="tablinks" onClick={() => openTab(event,'Informal')}>Informal</button>
        <button className="tablinks" onClick={() => openTab(event,'VotingProcedure')}>Voting Procedure</button>
        <button className="tablinks" onClick={() => openTab(event,'NotesDias')}>Notes to the Dias</button>
        </div>

        <div id="RollCall" className="tabcontent">
            <div className="RollCallBlock">
                <div className="RollCallList">
                    <div className="searchBlock">
                            <input className="searchBox" placeholder="Search" type="text" />
                    </div>
                    <div className="titleBlock">
                        <h5 className="titles">Member State</h5>
                        <h5 className="titles">Absent</h5>
                        <h5 className="titles">Present</h5>
                        <h5 className="titles">Present & Voting</h5>
                    </div>
                    <div className="presentAbsentBlock">
                    </div>
                </div>
            </div>

            <div className="buttonBlock1">
                <div className="firstBlock">
                <CoolButton buttonText={"Start Roll Call"} buttonColor={'#FF9728'} textColor='white' />
                <CoolButton buttonText={"Export"} buttonColor={'#00DB89'} textColor='white' />
                </div>
                <div className="secondBlock">
                <CoolButton buttonText={"Reset"} buttonColor={'#FF9728'} textColor='white' />
                </div>
            </div>
        </div>

        <div id="Formal" className="tabcontent">
            <div className="FormalBlock">
                <div className="SpeakerListBlock">
                    <div className="SpeakerListButtonBlock">
                        <button className="SpeakersListButton">Speakers List</button>
                    </div>
                    <div className="currentlySpeakingAndCurrent">
                        <div className="currentlySpeaking">
                        </div>
                        <div className="current">
                        </div>
                    </div>
                </div>

                <div className="MotionsBlock">
                    <div className="MotionsButtonBlock">
                        <button className="MotionsButton">Motions</button>
                    </div>

                    <div className="timerBlock">
                    </div>

                    <div className="timerBlock2">
                    </div>

                    <div className="presentationButtonBlock">
                    <button className="presentationButton">Presentation</button>
                    </div>


                </div>
            </div>
        </div>

        <div id="Informal" className="tabcontent">
            <h3 className="head">Informal</h3>
        </div>

        <div id="VotingProcedure" className="tabcontent">
            <h3 className="head">Voting Procedure</h3>
        </div>

        <div id="NotesDias" className="tabcontent">
            <h3 className="head">Notes to the Dias</h3>
        </div>
    </div>
    );
}


export default DiasHome;