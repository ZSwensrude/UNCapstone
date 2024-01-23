import { Typography } from "@mui/material";
import React from "react";
import './HomeIndex.css';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import { Link } from 'react-router-dom';

const Home=()=>{
  return (
    <div className="all">

        <div className="bar">
        </div>
        <div className="logo">
        <img src={window.location.origin + '/images/Unlogo.jpg'} alt="logoImage" />
        </div>
        <div className= "top">
            <h2 className="welcomeHeader">Welcome to United Nations</h2>
        </div>
        

        <div className="logins">
            <div className="container1">
            <div className="heading"> 
                <h1 className="diasAndDelegateHeader">Dias Login</h1>
                <img src={window.location.origin + '/images/lecturer.png'} width={35} height={55} alt="lecturerImage" />
            </div>
                    <div className="usernameLabel">
                        <h6 className="header6">Username</h6> 
                        <div className="input-box">
                            <input type="text" required />
                        </div>
                        <GavelIcon style={{ color: "white" }}/>
                    </div>

                    <div className="passwordLabel">
                        <h6 className="header6">Password</h6>
                        <div className="input-box">
                            <input type="password" required />
                        </div>
                        <LockIcon style={{ color: "white" }}/>
                    </div>

                    <div className="diasButtons">
                    <button className="register" type="submit">Register</button>
                    <Link to={'/dias'}>
                    <button className="loginButton" type="submit">Login</button>
                    </Link>
                    </div>
            </div>

            <div className="container2">
            <div className="heading">   
            <h1 className="diasAndDelegateHeader">Delegate Login</h1>
            <img src={window.location.origin + '/images/delegate.png'} width={35} height={55} alt="lecturerImage" />
            </div>
                <div className="countryLabel">
                <label htmlFor="country">Country</label>
                <select name="countries" id="countries">
                    <option value="choice"></option>
                    <option value="afganistan">Afganistan</option>
                    <option value="albania">Albania</option>
                    <option value="algeria">Algeria</option>
                    <option value="andorra">Andorra</option>
                    <option value="angola">Angola</option>
                    <option value="antiguaAndBarbuda">Antigua and Barbuda</option>
                    <option value="argentina">Argentia</option>
                    <option value="canada">Canada</option>
                    <option value="united kingdom">United Kingdom</option>
                </select>
                <PublicIcon style={{ color: "white"}} />
                </div>
                
                <div className="sessionLabel">
                    <h6 className="header6">Session ID</h6>
                    <div className="input-box">
                        <input type="text" required />
                    </div>
                    <InfoIcon style={{ color: "white"}} />
                </div>

                <div className="submitButton">
                <Link to={'/delegate'}>
                    <button className="loginButton" type="submit">Login</button>
                </Link>
                    </div>
                </div>
                {/* TO import images, you can put the image in /public/images/ then import it with the following:
                 window.location.origin + '/images/YourImage.whatever*/}

        </div>
    </div>
    
    );
    
}

export default Home;

