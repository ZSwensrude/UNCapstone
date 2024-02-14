import React from "react";
import Header from "../components/Header";
import "./InformalPresentation.css";
import DeadlineDias from "../components/DeadlinesDias";

const InformalPresentation = () => {

    const DeadlineListDias = [
        {
            "deadlineAdded": "Working Paper Third Draft: 2pm"
        },
        {
            "deadlineAdded": "Amendment Form Due: 4pm"
        }
      ]

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

            <div className="mainBlockInformal">
                <div className="deadlinesWholeBlock">
                    <div className="DeadlinesTitleBlock">
                        <div className="DeadlinesTitle">Deadlines</div>
                    </div>

                    <div className="DeadlinesBlock">
                        <div className="Deadlines">
                            {DeadlineListDias.map ( (aDeadlineDias, index) => (
                            <DeadlineDias key={aDeadlineDias.deadlineAdded + index} version={"informalScreen"} aDeadlineDias={aDeadlineDias}/>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="timerWholeBlock">
                    <div className="BackInSessionBlock">
                            <h2 className="BackInSessionTitle">Back In Session In:</h2>
                    </div>
                    <div className="timerBlock2">
                    </div>
                </div>
            </div>
        </div>
        );
    }
    
    export default InformalPresentation;