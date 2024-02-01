import React from 'react';
import CoolButton from "../CoolButton";
import "./CreateConference.css";
import { useNavigate } from 'react-router-dom';

function CreateConference( { closeModal }) {

    const navigate = useNavigate();

    const toDiasHome = () => {
        // Navigate to a different route
        navigate('/dias-home-page');
    };

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
                            <input type="text" required />
                        </div>
                    </div>
                    <div className="ComiteeLabel">
                        <h6 className="header1">Commitee:</h6> 
                        <div className="inputBox">
                            <input type="text" required />
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