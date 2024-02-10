import { Typography, Paper, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useState } from "react";
import './DiasHomePageIndex.css';
import '../components/components.css';
import CoolButton from "../components/CoolButton";
//import Country from '../components/Country';
import SettingsIcon from '@mui/icons-material/Settings';
import PresentAbsentList from "../components/PresentAbsentList";
import StatusBox from "../components/StatusBox/StatusBox.js";
import MotionsDias from "../components/MotionsDias.js";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import DeadlineDias from "../components/DeadlinesDias.js";
import PriorLocations from "../components/PriorLocations.js";
import NotesToDias from "../components/NotesToDias.js";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate  } from 'react-router-dom';
import DiasSpeakersList from '../components/DiasSpeakersList.js';

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
  const countries = [
    { position: 1, countryName: 'Country A', flagPath: '/path/to/flagA.png' },
    { position: 2, countryName: 'Country B', flagPath: '/path/to/flagB.png' },
    // Add more countries as needed
  ];

  const countriesLists = [
    {
      "countryName": "Argentina"
    },
    {
      "countryName": "Canada"
    }
  ]

  const motionsListDias = [
    {
      "motionChosen": "SpeakerTime: 60 Seconds"
    },
    {
        "motionChosen": "Informal Session: 30 Minutes"
    }
  ]

  const DeadlineListDias = [
    {
        "deadlineAdded": "Working Paper Third Draft: 2pm"
    },
    {
        "deadlineAdded": "Amendment Form Due: 4pm"
    }
  ]

  const conferenceLocations = [
    {
      "cLocation": "SA-214k"
    },
    {
        "cLocation": "Northwest Center"
    },
    {
        "cLocation": "SA-214b",
    }
  ]

  const notesToDiasGroups = [
    {
      "noteCountry": "China",
      "noteFromCountry": "Just saying Hi!",
      "status": "read"
    },
    {
        "noteCountry": "Canada",
        "noteFromCountry": "Not Happy!",
        "status": "unread"
    }
  ]

  const [open, setOpen] = React.useState(false);
 
  const handleClickToOpen = () => {
      setOpen(true);
  };

  const handleToClose = () => {
      setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
 
  const handleClickToOpen1 = () => {
      setOpen1(true);
  };

  const handleToClose1 = () => {
      setOpen1(false);
  };
  const navigate = useNavigate();

    const toInformalPresentation = () => {
        // Navigate to a different route
        navigate('/informal-presentation');
    };

  return (
    <div className="HomePageDias">
        
        <div className="diasBar">
            <Paper id='logoback' elevation={0}>
                <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
            </Paper>
            <div className="diasTabs">
                <button className="tablinks" onClick={() => openTab(event,'RollCall')}>Roll Call</button>
                <button className="tablinks" onClick={() => openTab(event,'Formal')}>Formal</button>
                <button className="tablinks" onClick={() => openTab(event,'Informal')}>Informal</button>
                <button className="tablinks" onClick={() => openTab(event,'VotingProcedure')}>Voting Procedure</button>
                <button className="tablinks" onClick={() => openTab(event,'NotesDias')}>Notes to the Dias</button>
            </div>
            
            <button className="statusButton" onClick={handleClickToOpen}>Status</button>
            <SettingsIcon id='settings'/>
        </div>

        <Dialog open={open1} onClose={handleToClose1}>
            <DialogTitle>{"hello?"}</DialogTitle>
            <DialogContent>
            <CoolButton buttonText={"Cancel"} onClick={handleToClose1} buttonColor={'#800000'} textColor='white' />
            </DialogContent>
        </Dialog>

        <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>{"Change Status?"}</DialogTitle>
            <DialogContent>
                <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="Roll Call"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="RollCall" control={<Radio />} label="Roll Call" />
                    <FormControlLabel value="Formal" control={<Radio />} label="Formal" />
                    <FormControlLabel value="Informal" control={<Radio />} label="Informal" />
                    <FormControlLabel value="VotingProcedure" control={<Radio />} label="Voting Procedure" />
                </RadioGroup>
            
                <div className='statusButtons'>
                        <CoolButton buttonText={"Cancel"} onClick={handleToClose} buttonColor={'#800000'} textColor='white' />
                        <CoolButton buttonText={"Change"} buttonColor={'#FF9728'} textColor='white' />
                </div>
                </DialogContent>
        </Dialog>

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
                    {countriesLists.map( (countryList, index) => (
                    <PresentAbsentList key={countryList.countryName + index} countryList={countryList}/>
                    ))}
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
                        <div className="SpeakersListButton">Speakers List</div>
                    </div>
                    <div className="currentlySpeakingAndControl">
                        <div className="currentlySpeaking">
                            <DiasSpeakersList />
                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">Speaker Timer:</div>
                            </div>

                            <div className="SpeakerTimerBlock">
                                <div className="Timer"></div>
                            </div>

                            <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Reset"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Pause"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Next"} buttonColor={'#FF9728'} textColor='white' />
                            </div>


                        </div>
                        <div className="control">
                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">Control</div>
                            </div>
                            <div className="controlInputBox">
                                <input className="controlInput" placeholder="Search" type="text" />
                            </div>
                            <div className="addButtonBlock">   
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                            </div>

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="controlList"></div>

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Clear List"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Close Speaker List"} buttonColor={'#FF9728'} textColor='white' />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="MotionsBlock">
                    <div className="MotionsButtonBlock">
                        <div button className="MotionsButton">Motions</div>
                    </div>

                    <div className="motionBlock">
                        <div className="addMotionBox">
                            <input className="MotionInput" placeholder="Type here..." type="text" />
                        </div>

                        <div className="addButtonBlock">   
                            <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="motionsAdded">
                        {motionsListDias.map( (aMotionDias, index) => (
                            <MotionsDias key={aMotionDias.motionChosen + index} aMotionDias={aMotionDias}/>
                            ))}
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>
                        
                        <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Clear All"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Send"} buttonColor={'#00DB89'} textColor='white' />
                        </div>


                    </div>

                    <div className="timerBlock">
                        <div className="controlTitleBlock">
                                <div h2 className="speakerTimerTitle">Speakers Timer: 60 Seconds</div>
                        </div>
                        
                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="timerLogos">
                            <div className="logos">
                            <CheckIcon style={{ color: "green" }} fontSize="large"/>
                            <CloseIcon style={{ color: "red" }} fontSize="large"/>
                            <RemoveIcon style={{ color: "yellow" }} fontSize="large"/>
                            </div>
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="controlTitleBlock">
                                <div h2 className="responders">Responded: / </div>
                        </div>

                    </div>

                    <div className="presentationButtonBlock">
                        <CoolButton buttonText={"Presentation"} buttonColor={'#00DB89'} textColor='white' />
                    </div>


                </div>
            </div>
        </div>

        <div id="Informal" className="tabcontent">
            <div className="InformalBlock">
                <div className="DeadlinesAndTimerBlock">
                    <div className="BackInSessionBlock">
                        <div h2 className="BackInSessionTitle">Back In Session In:</div>
                    </div>
                    <div className="timerBlock2">
                    </div>
                    <div className="timerBlock2Buttons">   
                        <CoolButton buttonText={"Restart"} buttonColor={'#FF9728'} textColor='white' />
                        <CoolButton buttonText={"Pause"} buttonColor={'#FF9728'} textColor='white' />
                    </div>
                    <div className="DeadlinesTitleBlock">
                        <div className="DeadlinesTitle">Deadlines</div>
                    </div>
                    <div className="DeadlinesBlock">
                        <div className="Deadlines">
                            {DeadlineListDias.map( (aDeadlineDias, index) => (
                            <DeadlineDias key={aDeadlineDias.deadlineAdded + index} aDeadlineDias={aDeadlineDias}/>
                            ))}
                        </div>
                        <div className="lineABlock">
                            <div className="lineC"></div>
                        </div>
                        <div className="addDeadlinesBox">
                            <input className="DeadlineInput" placeholder="Type here..." type="text" />
                        </div>
                        <div className="DeadlineButtons">   
                            <CoolButton buttonText={"Clear All"} buttonColor={'#FF9728'} textColor='white' />
                            <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                        </div>
                    </div>

                </div>
                
                <div className="WorkingGroupsBlock">
                    <div className="WorkingGroupTitleBlock">
                        <div className="WorkingGroupTitle">Working Groups</div>
                    </div>
                    <div className="WorkingGroupBlock2">
                        <div className="WorkingGroupsDatabase">

                        </div>
                        <div className="WorkingGroupButtons">   
                            <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                            <CoolButton buttonText={"Merge Selected"}  onClick={handleClickToOpen1} buttonColor={'#00DB89'} textColor='white' />
                        </div>
                    </div>
                </div>

                <div className="LocationsAndPresentationBlock">          
                    <div className="LocationTitleBlock">
                        <div className="LocationTitle">Locations</div>
                    </div>
                    <div className="LocationsBlock2">
                            {conferenceLocations.map( (conferenceLocation, index) => (
                            <PriorLocations key={conferenceLocation.cLocation + index} conferenceLocation={conferenceLocation}/>
                            ))}
                    </div>
                    <div className="presentationButtonBlock">
                        <CoolButton onClick={toInformalPresentation} buttonText={"Presentation"} buttonColor={'#00DB89'} textColor='white' />
                    </div>  
                </div>
            </div>
        </div>

        <div id="VotingProcedure" className="tabcontent">
            <h3 className="head">Voting Procedure</h3>
        </div>

        <div id="NotesDias" className="tabcontent">
            <div className="NotesDiasBlock">
                <div className="NotesDiasList">
                    {notesToDiasGroups.map( (aDiasNote, index) => (
                        <NotesToDias key={aDiasNote.noteChosen + index} aDiasNote={aDiasNote}/>
                        ))}
                </div>
            </div>
        </div>
    </div>
    );
}


export default DiasHome;