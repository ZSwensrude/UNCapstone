import React from 'react';
import CoolButton from "../CoolButton";
import "./CreateConference.css";
import { useNavigate } from 'react-router-dom';
import PriorLocations from '../PriorLocations';

function CreateConference( { closeModal }) {

    const navigate = useNavigate();

    const toDiasHome = () => {
        // Navigate to a different route
        navigate('/dias-home-page');
    };

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

    return (
        <div className='ModalBackground'>
            <div className='modalContainer'>

                <div className='firstPart'>
                    <div className='createConferenceTitleBlock'>
                        <div className='title1'>Create Conference</div>
                    </div>
                    <div className="TitleLabel">
                        <h6 className="header1">Title:</h6> 
                        <div className="inputBox">
                            <input id="conferenceTitle" type="text" required />
                        </div>
                    </div>
                    <div className="ComiteeLabel">
                        <h6 className="header1">Commitee:</h6> 
                        <div className="inputBox">
                            <input id="conferenceCommitee" type="text" required />
                        </div>
                    </div>
                    <div className='smallLineBox'>
                        <div className="smallLine"></div>
                    </div>

                </div>

                <div className='secondPart'>

                    <div className='PresetLocationsTitleBlock'>
                        <div className='title2'>Preset Locations</div>       
                    </div>

                    <div className="locationBoxBlock">
                        <div className='locationBox'>

                            <div className="locationInputBox">
                                <input className="locationInput" placeholder="type here..." type="text" />
                            </div>

                            <div className='addButtonBox'>
                                <CoolButton buttonText={"Add"} buttonColor={'#FF9728'} textColor='white' />
                            </div>

                            <div className='smallerLineBox'>
                                <div className="smallerLine"></div>
                            </div>

                            {conferenceLocations.map( (conferenceLocation, index) => (
                            <PriorLocations key={conferenceLocation.cLocation + index} conferenceLocation={conferenceLocation}/>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='thirdPart'>
                    <div className='smallLineBox'>
                        <div className="smallLine"></div>
                    </div>
                    <div className='createConfButtons'>
                        <CoolButton buttonText={"Cancel"} onClick={() => {closeModal(false);}} buttonColor={'#800000'} textColor='white' />
                        <CoolButton buttonText={"Create"} onClick={toDiasHome} buttonColor={'#FF9728'} textColor='white' />
                    </div>
                </div>


                

            </div>
        </div>
    )
}

export default CreateConference