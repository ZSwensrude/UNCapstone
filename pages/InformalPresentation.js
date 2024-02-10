import React from "react";
import Header from "../components/Header";

const InformalPresentation = () => {

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

        </div>

        );
    }
    
    export default InformalPresentation;