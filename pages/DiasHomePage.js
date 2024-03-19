//DiasHomePage.js
import { Typography, Paper, Dialog, DialogContent, DialogActions, DialogTitle, Radio, RadioGroup, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { useState } from "react";
import './DiasHomePageIndex.css';
import '../components/components.css';
import CoolButton from "../components/CoolButton";
import SettingsIcon from '@mui/icons-material/Settings';
import PresentAbsentList from "../components/PresentAbsentList";
import MotionsDias from "../components/MotionsDias.js";
import DeadlineDias from "../components/DeadlinesDias.js";
import PriorLocations from "../components/PriorLocations.js";
import NotesToDias from "../components/NotesToDias.js";
import WorkingGroupsListDIAS from "../components/WorkingGroupsListDIAS.js";
import { useNavigate } from 'react-router-dom';
import DiasSpeakersList from '../components/DiasSpeakersList.js';

import flagData from '../flags.json';
import VoteCountChart from "../components/VoteCountBox.js";
import LogoutButton from "../components/LogoutButton.js";


import { insertSpeaker,removeSpeaker,deleteDMFromDB,updateDMReadStatus, updateConferenceActiveStatus, conferenceCollection, updateRollCallStatus, updateConfStatus, removeDeadlineFromConf, addDeadlineToConf, insertMotion, removeMotion, clearallMotions } from "../imports/api/conference.js";


import BellIcon from '@mui/icons-material/Notifications';
import auth from "../components/auth.js";
import MessageDias from "../components/MessageDias.js";
import TimerSession from "../components/TimerSession.js";
import TimerSpeaker from "../components/TimerSpeaker.js";
import showScreens from "../client/showScreens.js";


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
    if (evt.currentTarget)
        evt.currentTarget.className += " active";
}


// Placeholder for Dias screen
const DiasHome = () => {
    const getUserFromLocalStorage = () => {
        const userString = localStorage.getItem('loggedInUser');
        return userString ? JSON.parse(userString) : null;
    };
    const user = getUserFromLocalStorage();

    // CONFERENCE DATA 
    // Define state variable to store conference data
    const [conferenceData, setConferenceData] = useState(null);
    const [deadlines, setDeadlines] = useState([]);
    const [newDeadline, setNewDeadline] = useState("");
    const [openStatus, setOpenStatus] = useState(false);
    const [confStatus, setConfStatus] = useState("");
    const [motionsListDias, setMotionsListDias] = useState([]);
    var activeMotion = null;
    const [delegatesListDias, setDelegatesListDias] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState(false);
    const [dms, setDms] = useState([]);

    // Fetch conference data using useTracker hook
    useTracker(() => {
        const handler = Meteor.subscribe('conference');
        const data = conferenceCollection.findOne({ sessionID: user.confID }); // make this figure out the conf code from db
        const allDms = data?.DMs?.filter((dm) => dm.type === 'dias');
        setDeadlines(data?.deadlines);
        setConfStatus(data?.status);
        setMotionsListDias(data?.motions);
        activeMotion = data?.motions?.find((motion) => motion.active === true);
        setDelegatesListDias(data?.delegates);
        setDms(allDms?.sort((a, b) => a.createdAt - b.createdAt));
        setConferenceData(data); // Update conference data in state
    }, []);

    const countUnreadMessages = (dms) => { // Change parameter name to dmData
        return dms?.filter(dm => dm.read === "false").length;
    };

    useEffect(() => {
        // Update unread messages count
        setUnreadMessages(dms?.filter(dm => dm.read === "false").length > 0);
    }, [dms]);

    const removeDeadline = (deadline) => {
        removeDeadlineFromConf(conferenceData._id, deadline.deadlineAdded);
    };

    const removeAllDeadlines = () => {
        deadlines.forEach(deadline => {
            removeDeadlineFromConf(conferenceData._id, deadline.deadlineAdded);
        });
    };

    const addDeadline = () => {
        addDeadlineToConf(conferenceData._id, newDeadline);
        setNewDeadline("");
    };


    const handleClickToOpenStatus = () => {
        setOpenStatus(true);
    };

    const handleToCloseStatus = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpenStatus(false);
        setConfStatus(conferenceData.status);
    };

    const handleSetStatus = () => {
        const { _id } = conferenceData;
        updateConfStatus(_id, confStatus)
        setOpenStatus(false);
    }

    const handleStatusChange = (event) => {
        setConfStatus(event.target.value);
    }


    const conferenceLocations = [
        {
            "cLocation": "SA-214k",
            "cGroup": "Group 1"
        },
        {
            "cLocation": "Northwest Center",
            "cGroup": "Group 2"
        },
        {
            "cLocation": "SA-214b",
            "cGroup": "Group 1"
        }
    ]

    const [rollCallButton, setRollCallButton] = React.useState('');

    // opens the status popup


    //opens the merge selected button pop up
    const [openMerge, setOpenMerge] = React.useState(false);

    const handleClickToOpenMerge = () => {
        setOpenMerge(true);
    };

    const handleToCloseMerge = () => {
        setOpenMerge(false);
    };


    const navigate = useNavigate();

    const toPresentation = () => {
        // open new window with presentation screen
        window.open('/presentation')
    };

    const [openSpkClear, setopenSpkClear] = React.useState(false);

    const clearSpkList = () => {
        setopenSpkClear(true); // Open the confirmation dialog
    };

    const handleClearConfirmed = () => {
        setopenSpkClear(false); // Close the confirmation dialog
        const conference = conferenceCollection.findOne({ sessionID: user.confID });
        const speakers = conference ? conference.speakers : [];
        speakers.forEach(speaker => {
            removeSpeaker({ sessionId: user.confID, _idspeaker: speaker._id }); // Pass _id to removeSpeaker
        });
    };
    
    const handleSpkNext = () => {
        const conference = conferenceCollection.findOne({ sessionID: user.confID });
        const speakers = conference ? conference.speakers : [];
        if (speakers.length > 0) {
            removeSpeaker({ sessionId: user.confID, _idspeaker: speakers[0]._id }); // remove current speaker
        }
    };
    

    const handleClearCancelled = () => {
        setopenSpkClear(false); // Close the confirmation dialog
    };

    // Define state variables for searchTerm and searchResults
    const [searchTerm, setSearchTerm] = useState('');

    const addtolist = (searchTerm) => {

        // Insert the speaker with the selected country
        insertSpeaker({ country: searchTerm, sessionId: user.confID });
    };


    //update later to get sessionID and corresponding record in conference table
    // Function to update speaker list active status
    const updateSpkerlistactive = () => {
        if (conferenceData) {
            const { _id, activeSpeakerList } = conferenceData;
            const updatedActiveStatus = !activeSpeakerList;
            updateConferenceActiveStatus({ conferenceId: _id, activeSpeakerList: updatedActiveStatus });
        }
    };
    // Update button text based on activeSpeakerList value
    useEffect(() => {
        if (conferenceData) {
            setButtonText(conferenceData.activeSpeakerList ? "Close Speaker List" : "Open Speaker List");
        }
    }, [conferenceData?.activeSpeakerList]);

    const [buttonText, setButtonText] = useState("");
    const updateRollCallActive = () => {
        if (conferenceData) {
            const { _id, rollCallOpen } = conferenceData;
            const updatedRollCall = !rollCallOpen;
            updateRollCallStatus(_id, updatedRollCall);
        }
    };

    useEffect(() => {
        setRollCallButton(conferenceData?.rollCallOpen ? "Close Roll Call" : "Start Roll Call");
    }, [conferenceData?.rollCallOpen]);

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
        insertMotion({ sessionId: user.confID ,content: motionContent, abstain: abstain });

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
// Function to handle clearing all motions when confirmed
const handleClearAllMotions = () => {
    // Close the confirmation dialog
    setOpenClearConfirmation(false);

    try {
        // Call the clearallMotions function to remove all motions
        clearallMotions(user.confID);
        console.log('All motions cleared successfully.');
    } catch (error) {
        console.error('Error clearing all motions:', error);
    }
};



    useEffect(() => { auth().catch(() => { navigate("/") }) }, []);


    const markAsRead = () => {
        let diasMessages = dmCollection.find({ to: 'delegates' }, { sort: { createdAt: -1 } }).fetch();
        diasMessages.forEach(message => {
            updateDMReadStatus(message._id, "true");
        });
    };

    const deleteSentMessages = () => {
        let diasMessages = dmCollection.find({ to: 'delegates' }, { sort: { createdAt: -1 } }).fetch();
        diasMessages.forEach(message => {
            deleteDMFromDB(message._id);
        });
    };

    return (
        <div className="HomePageDias">
            <LogoutButton />


            <div className="diasBar">
                <Paper id='logoback' elevation={0}>
                    <img id='un' src={window.location.origin + '/images/UN_emblem_blue.png'} alt='United Nations Logo' />
                </Paper>
                <div className="diasTabs">
                    <button className="tablinks" onClick={() => openTab(Event, 'RollCall')}>Roll Call</button>
                    <button className="tablinks" onClick={() => openTab(Event, 'Formal')}>Formal</button>
                    <button className="tablinks" onClick={() => openTab(Event, 'Informal')}>Informal</button>
                    {showScreens && <button className="tablinks" onClick={() => openTab(Event, 'VotingProcedure')}>Voting Procedure</button>}
                    <button className="tablinks" onClick={() => openTab(Event, 'NotesDias')}>
                        Notes to the Dias
                        {unreadMessages && <BellIcon className="bellIcon" />} {/* Render the bell icon conditionally */}
                    </button>
                </div>

                <button className="statusButton" onClick={handleClickToOpenStatus}>Status</button>
                <SettingsIcon id='settings' />
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

            <Dialog open={openMerge} onClose={handleToCloseMerge}>
                <DialogTitle>{"hello?"}</DialogTitle>
                <DialogContent>
                    <CoolButton buttonText={"Cancel"} onClick={handleToCloseMerge} buttonColor={'#800000'} textColor='white' />
                </DialogContent>
            </Dialog>

            <Dialog open={openStatus} onClose={handleToCloseStatus}>
                <DialogTitle>{"Change Status?"}</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        value={confStatus}
                        name="controlled-radio-buttons-group"
                        onChange={handleStatusChange}
                    >
                        <FormControlLabel value="waiting" control={<Radio />} label="Waiting" />
                        <FormControlLabel value="formal" control={<Radio />} label="Formal" />
                        <FormControlLabel value="informal" control={<Radio />} label="Informal" />
                        {showScreens && <FormControlLabel value="votingProcedure" control={<Radio />} label="Voting Procedure" />}
                    </RadioGroup>

                    <div className='statusButtons'>
                        <CoolButton buttonText={"Cancel"} onClick={handleToCloseStatus} buttonColor={'#800000'} textColor='white' />
                        <CoolButton buttonText={"Change"} onClick={handleSetStatus} buttonColor={'#FF9728'} textColor='white' />
                    </div>
                </DialogContent>
            </Dialog>

            <div id="RollCall" className="tabcontent" style={{ display: "block" }}>
                <div className="buttonBlock1">
                    <div className="firstBlock">
                        <CoolButton onClick={updateRollCallActive} buttonText={rollCallButton} buttonColor={'#FF9728'} textColor='white' />
                        {showScreens && <CoolButton buttonText={"Reset"} buttonColor={'#FF9728'} textColor='white' />}
                    </div>
                    <div className="secondBlock">
                        {showScreens && <CoolButton buttonText={"Export"} buttonColor={'#00DB89'} textColor='white' />}
                    </div>
                </div>
                <div className="RollCallBlock">
                    <div className="RollCallList">
                        {showScreens && <div className="searchBlock">
                            <input className="searchBox" placeholder="Search" type="text" />
                        </div>}
                        <table className="rollCallTable">
                            <thead>
                                <tr className="titleBlock">
                                    <th className="titles">Member State</th>
                                    <th className="titles">Absent</th>
                                    <th className="titles">Present</th>
                                    <th className="titles">Present &amp; Voting</th>
                                </tr>
                            </thead>
                            <tbody className="presentAbsentBlock">
                                {delegatesListDias && delegatesListDias.map((delegate, index) => (
                                    <PresentAbsentList key={delegate?.country + index + "palist"} delegate={delegate} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="Formal" className="tabcontent" style={{ display: "none" }}>
                <div className="FormalBlock">
                    <div className="SpeakerListBlock">
                        <div className="SpeakerListButtonBlock">
                            <div className="SpeakersListButton">Speakers List</div>
                        </div>
                        <div className="currentlySpeakingAndControl">
                            <div className="currentlySpeaking">
                                <DiasSpeakersList confID={user?.confID} />

                            </div>
                            <div className="control">
                                <div className="controlTitleBlock">
                                    <h2 className="controlTitle">Control</h2>
                                </div>
                                <div className="controlInputBox">
                                    <select
                                        className="controlInput"
                                        value={searchTerm}
                                        onChange={(e) => addtolist(e.target.value)} // Pass the selected value to addtolist
                                    >
                                        <option value="">Select a country</option>
                                        {flagData.countries.map((country, index) => (
                                            <option key={country?.country + index + "flagdata"} value={country.country}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="addButtonBlock">
                                    {/* <CoolButton buttonText={"Add to queue"} buttonColor={'#FF9728'} textColor='white' onClick={addtolist}/> */}
                                </div>



                                <div className="clearAndCloseButtonBlock">
                                    <CoolButton buttonText={"Clear List"} buttonColor={'#FF9728'} textColor='white' onClick={clearSpkList} />
                                    <CoolButton
                                        buttonText={"Close Speaker List"}
                                        buttonColor={'#FF9728'}
                                        textColor='white'
                                        onClick={updateSpkerlistactive}
                                    />
                                    <CoolButton buttonText={"Next Speaker"} buttonColor={'#FF9728'} textColor='white' onClick={handleSpkNext} />
                                </div>
                                <TimerSpeaker />
                            </div>

                        </div>
                    </div>

                    <div className="MotionsBlock">
                        <div className="MotionsButtonBlock">
                            <div className="MotionsButton">Motions</div>
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



                            <div className="motionsAdded">
                                {motionsListDias &&
                                    motionsListDias.map((aMotionDias, index) => (
                                        <MotionsDias key={`${index}-motions`} aMotionDias={aMotionDias} />))}
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

                        <div className="MotionSummaryBlock">
                            <div className="motion content">
                                {activeMotion && activeMotion.length > 0 && (
                                    activeMotion[0].content
                                )}
                            </div>
                            <div className="motions voteCount">
                                {activeMotion && activeMotion.length > 0 && (
                                    <VoteCountChart votes={activeMotion[0].votes} abstain={activeMotion[0].abstain} />
                                )}
                            </div>
                            <div className="motions totals">

                            </div>

                        </div>

                        <div className="presentationButtonBlock">
                            <CoolButton onClick={toPresentation} buttonText={"Presentation"} buttonColor={'#00DB89'} textColor='white' />
                        </div>

                    </div>
                </div>
            </div>

            <div id="Informal" className="tabcontent" style={{ display: "none" }}>
                <div className="InformalBlock">
                    <div className="DeadlinesAndTimerBlock">
                        <TimerSession version={"diasHome"} time={conferenceData?.timer.time} confID={conferenceData?._id} />

                        <div className="DeadlinesTitleBlock">
                            <div className="DeadlinesTitle">Deadlines</div>
                        </div>
                        <div className="DeadlinesBlock">
                            <div className="Deadlines">
                                {deadlines?.map((deadline, index) => (
                                    <DeadlineDias key={deadline?.deadlineAdded + index + 'deadline'} removeDeadline={removeDeadline} version={"diasHome"} deadline={deadline} />
                                ))}
                            </div>
                            <TextField
                                id="outlined-controlled"
                                className="DeadlineInput"
                                placeholder="New Deadline: Time"
                                value={newDeadline}
                                onChange={(event) => {
                                    setNewDeadline(event.target.value);
                                }}
                            />
                            <div className="DeadlineButtons">
                                <CoolButton buttonText={"Clear All"} buttonColor={'#FF9728'} textColor='white' onClick={removeAllDeadlines} />
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' onClick={addDeadline} />
                            </div>
                        </div>

                    </div>

                    <div className="WorkingGroupsBlock">
                        <div className="WorkingGroupTitleBlock">
                            <div className="WorkingGroupTitle">Working Groups</div>
                        </div>
                        <div className="WorkingGroupBlock2">
                            <div className="WorkingGroupsDatabase">
                                <WorkingGroupsListDIAS />
                            </div>
                            {showScreens && <div className="WorkingGroupButtons">
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                                <CoolButton buttonText={"Merge Selected"} onClick={handleClickToOpenMerge} buttonColor={'#00DB89'} textColor='white' />
                            </div>}
                        </div>
                    </div>

                    <div className="LocationsAndPresentationBlock">
                        {showScreens && <div className="LocationTitleBlock">
                            <div className="LocationTitle">Locations</div>
                        </div>}
                        {showScreens && <div className="LocationsBlock2">
                            {conferenceLocations.map((conferenceLocation, index) => (
                                <PriorLocations key={conferenceLocation?.cLocation + index + "prior"} version={"diasHome"} conferenceLocation={conferenceLocation} />
                            ))}
                        </div>}
                        <div className="presentationButtonBlock">
                            <CoolButton onClick={toPresentation} buttonText={"Presentation"} buttonColor={'#00DB89'} textColor='white' />
                        </div>
                    </div>
                </div>
            </div>

            <div id="VotingProcedure" className="tabcontent" style={{ display: "none" }}>
                <h3 className="head">Voting Procedure</h3>
            </div>

            <div id="NotesDias" className="tabcontent" style={{ display: "none" }}>
                <div className="NotesDiasBlock">
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <MessageDias dias={true} />
                        <CoolButton textColor={'white'} buttonColor={'#989898'} buttonText={'mark my message as read'} onClick={markAsRead} />
                        <CoolButton textColor={'white'} buttonColor={'#cb0000'} buttonText={'delete my messages'} onClick={deleteSentMessages} />
                    </div>
                    <br />
                    {dms?.length > 0 ? (
                        <table>
                            <tbody>
                                {dms.map((dm, index) => (
                                    <NotesToDias key={index + "note"} aDiasNote={dm} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <Typography>No notes to display</Typography>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DiasHome;