import React from "react";
import Header from "../components/Header";
import "./FormalPresentation.css";

const FormalPresentation = () => {

    return (
        <div className="all">
        
            <div className="header">
            <Header version={'blank'}/>
            </div>

            <div className="logo">
                <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />
            </div>

            <div className= "top">
                <h2 className="welcomeHeader">United Nations Environment Assembly</h2>
            </div>

            <div className="mainBlockFormal">

                <div className="SpeakerListBlock1">
                    <div className="SpeakerListButtonBlock1">
                        <div className="SpeakersListButton1">Speakers List</div>
                    </div>
                    <div className="FormalSpeakerList"> 
                    </div>
                </div>

                <div className="currentlySpeakingBlock1">
                    <div className="currentlySpeakingButtonBlock1">
                        <div className="CurrentlySpeakingButton1">Currently Speaking</div>
                    </div>
                </div>

                <div className="MotionListBlock1">
                    <div className="MotionsListButtonBlock1">
                        <div className="MotionsListButton1">Motions</div>
                    </div>
                    <div className="FormalMotionList"> 
                    </div>
                </div>


            </div>
        
        </div>

    );
}

export default FormalPresentation;
