//DiasHomePage.js
import { Typography, Paper, Dialog, DialogContent, DialogActions, DialogTitle, Radio, RadioGroup, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { useState } from "react";
import './DiasHomePageIndex.css';
import '../components/components.css';
import CoolButton from "../components/CoolButton";
import Country from '../components/Country';
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
import { useNavigate  } from 'react-router-dom';
import DiasSpeakersList from '../components/DiasSpeakersList.js';
import { motionCollection, insertMotion, removeMotion, switchActiveMotion} from "../imports/api/motions.js";
import { speakerCollection, removeSpeaker, insertSpeaker } from "../imports/api/speakers.js";
import flagData from '../flags.json';
import { insertConference, updateConferenceActiveStatus, conferenceCollection} from "../imports/api/conference.js";

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


   //DB Communication - live pull on any change in table
   const { motionsListDias = [] } = useTracker(() => {
    const handler = Meteor.subscribe('motions');
    const motionsListDias = motionCollection.find().fetch();
    return { motionsListDias };
});


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

    const [openSpkClear, setopenSpkClear] = React.useState(false);
    
    const clearSpkList = () => {
        setopenSpkClear(true); // Open the confirmation dialog
    };
      
    const handleClearConfirmed = () => {
        setopenSpkClear(false); // Close the confirmation dialog
        console.log("clear pressed!!!!!!"); // Perform the clear operation
        const handler = Meteor.subscribe('speakers');
        const speakersData = speakerCollection.find().fetch(); 
        speakersData.forEach(speaker => {
            removeSpeaker({ _id: speaker._id }); // Pass _id to removeSpeaker
        });
    };

    const handleSpkNext = () => {
        console.log("next speaker pressed!!!!!!"); // Perform the clear operation
        const handler = Meteor.subscribe('speakers');
        const speakersData = speakerCollection.find().fetch(); 
        removeSpeaker({ _id: speakersData[0]._id }); // remove current speaker
    };

    const handleClearCancelled = () => {
        setopenSpkClear(false); // Close the confirmation dialog
        console.log("clear cancelled"); // Log that the clear operation was cancelled
    };

    // Define state variables for searchTerm and searchResults
const [searchTerm, setSearchTerm] = useState('');

    const addtolist = (searchTerm) =>{
        console.log("Selected country:", searchTerm);
    
        // Insert the speaker with the selected country
        insertSpeaker({ country: searchTerm });
    };
     // Define state variable to store conference data
     const [conferenceData, setConferenceData] = useState(null);

     // Fetch conference data using useTracker hook
     useTracker(() => {
         const handler = Meteor.subscribe('conference');
         const data = conferenceCollection.findOne();
         setConferenceData(data); // Update conference data in state
     }, []);
     
 //update later to get sessionID and corresponding record in conference table
     // Function to update speaker list active status
     const updateSpkerlistactive = () => {
         if (conferenceData) {
             const { _id, activeSpeakerList } = conferenceData;
             const updatedActiveStatus = !activeSpeakerList;
             updateConferenceActiveStatus({ conferenceId: _id, activeSpeakerList: updatedActiveStatus });
         }
     };
  
    // State variable to store motion content
    const [motionContent, setMotionContent] = useState('');
    const [abstain, setAbstain] = useState(false);
    const [motionError, setMotionError] = useState('');

    const handleAbstainChange = (event) => {
        setAbstain(event.target.checked);
    };
    
    // Function to handle motion content change
    const handleMotionContentChange = (event) => {
        setMotionContent(event.target.value);
    };

    // Function to add motion
    const addMotion = () => {
        if (motionContent.trim() === '') {
            setMotionError('Motion content cannot be empty!');
            return;
        }

        // Insert motion into the motions table with active set to false
        insertMotion({ content: motionContent, abstain: abstain });
        
        // Clear motion content and abstain status
        setMotionContent('');
        setAbstain(false);
        setMotionError('');
    };
        // Add a state variable for controlling the visibility of the confirmation dialog
        const [openClearConfirmation, setOpenClearConfirmation] = React.useState(false);

        // Function to open the confirmation dialog
        const openClearConfirmationDialog = () => {
            setOpenClearConfirmation(true);
        };

        // Function to close the confirmation dialog
        const closeClearConfirmationDialog = () => {
            setOpenClearConfirmation(false);
        };

        // Function to handle clearing all motions when confirmed
        const handleClearAllMotions = () => {
            // Close the confirmation dialog
            setOpenClearConfirmation(false);
            
            // Perform the clear operation
            const handler = Meteor.subscribe('motions');
            const motionData = motionCollection.find().fetch(); 
            motionData.forEach(motion => {
                removeMotion({ _id: motion._id });
            });
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
        <Dialog open={openSpkClear} onClose={handleClearCancelled}>
        <DialogTitle>{"Are you sure you want to clear the speaker list?"}</DialogTitle>
        <DialogContent>
            {/* Add any additional content or instructions here */}
        </DialogContent>
        <DialogActions>
            <CoolButton buttonText={"Cancel"} onClick={handleClearCancelled} buttonColor={'#800000'} textColor='white' />
            <CoolButton buttonText={"Yes"} onClick={handleClearConfirmed} buttonColor={'#00DB89'} textColor='white' />
        </DialogActions>
        </Dialog>

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
                                <CoolButton buttonText={"Next"} buttonColor={'#FF9728'} textColor='white' onClick={handleSpkNext} />
                            </div>


                        </div>
                        <div className="control">
                            <div className="controlTitleBlock">
                                <div h2 className="controlTitle">Control</div>
                            </div>
                            <div className="controlInputBox">
                            <select
                                className="controlInput"
                                value={searchTerm}
                                onChange={(e) => addtolist(e.target.value)} // Pass the selected value to addtolist
                            >
                                <option value="">Select a country</option>
                                {flagData.countries.map((country, index) => (
                                    <option key={index} value={country.country}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                            <div className="addButtonBlock">   
                                {/* <CoolButton buttonText={"Add to queue"} buttonColor={'#FF9728'} textColor='white' onClick={addtolist}/> */}
                            </div>

                            {/* <div className="lineABlock">
                                <div className="lineA"></div>
                            </div> */}

                            {/* <div className="controlList diasSpkSrch">
                                <ul>
                                {searchResults.map((country, index) => (
                                    <Country key={index} countryName={country.country} />
                                ))}
                                </ul>
                            </div> */}

                            <div className="lineABlock">
                                <div className="lineA"></div>
                            </div>

                            <div className="clearAndCloseButtonBlock">   
                                <CoolButton buttonText={"Clear List"} buttonColor={'#FF9728'} textColor='white' onClick={clearSpkList} />
                                <CoolButton 
                                    buttonText={"Close/Open Speaker List"} 
                                    buttonColor={'#FF9728'} 
                                    textColor='white' 
                                    onClick={updateSpkerlistactive} // Add onClick event handler
                                />                            
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
                        <input
                            className="MotionInput"
                            placeholder="Motion Content..."
                            type="text"
                            value={motionContent}
                            onChange={handleMotionContentChange}
                        />
                        <div className="abstainCheck">
                            <FormControlLabel
                                control={<Checkbox checked={abstain} onChange={handleAbstainChange} />}
                                label="Allow abstain?"
                            />
                        </div>  
                    </div>

                        <div className="addButtonBlock">   
                            <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' onClick={addMotion} />
                            {motionError && <div className="error">{motionError}</div>}
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>

                        <div className="motionsAdded">
                        {motionsListDias &&
                            motionsListDias.map((aMotionDias, index) => (
                            <MotionsDias key={aMotionDias.motionChosen + index} aMotionDias={aMotionDias} /> ))}
                        </div>

                        <div className="lineABlock">
                                <div className="lineB"></div>
                        </div>
                        
                        <div className="clearAndCloseButtonBlock">   
                        <CoolButton buttonText={"Clear All"} buttonColor={'#FF9728'} textColor='white' onClick={openClearConfirmationDialog} />                                {/* <CoolButton buttonText={"Send"} buttonColor={'#00DB89'} textColor='white' /> */}
                        </div>
                        <Dialog open={openClearConfirmation} onClose={closeClearConfirmationDialog}>
                            <DialogTitle>{"Are you sure you want to clear all motions?"}</DialogTitle>
                            <DialogContent>
                                {/* Add any additional content or instructions here */}
                            </DialogContent>
                            <DialogActions>
                                <CoolButton buttonText={"No"} onClick={closeClearConfirmationDialog} buttonColor={'#800000'} textColor='white' />
                                <CoolButton buttonText={"Yes"} onClick={handleClearAllMotions} buttonColor={'#00DB89'} textColor='white' />
                            </DialogActions>
                        </Dialog>

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