import { Typography } from "@mui/material";
import React, {useState} from 'react';
import './HomeIndex.css';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import { Link } from 'react-router-dom';
import CoolButton from "../components/CoolButton";
import Header from "../components/Header";
import { useNavigate  } from 'react-router-dom';
import LoginButton from "../components/LoginButton";

import countriesData from '../flags.json'  
import { insertDel } from '../imports/api/delegates';

//import { LoginForm } from "../components/LoginForm";

const Home=()=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toRegister = () => {
    // Navigate to a different route
    Meteor.logout();
    navigate('/register');
  };
  
  
  const diasLogin = (modalOpen) => {

    Meteor.loginWithPassword(username, password, function(error) {

      if (error) {
         modalOpen();
      } else {
      // Store user data in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify({ username, password, userType: 'dias' }));
      navigate('/dias');      }
   })

  };


  const generateCountryOptions = () => {
    return countriesData.countries.map((country, index) => (
      <option key={index} value={country.country}>
        {country.country.charAt(0).toUpperCase() + country.country.slice(1)}
      </option>
    ));
  };

 
  const loginDelegate = (modalOpen) => {
    const selectedCountry = document.getElementById('countries').value;
    const sessionId = document.getElementById('sessionId').value;
    const username = selectedCountry + sessionId;
    const password = sessionId;
    Meteor.loginWithPassword(username, password, function(error) {
         
      if (error) {
         modalOpen();
         console.log("ERROR LOGGING IN")
      } else {
          // Store user data in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify({ username, password, userType: 'delegate', country: selectedCountry }));
          // Check if the country is selected
        if (selectedCountry === 'choice' || !sessionId) {
          setMessage('Please select a country and enter a session ID.');
          return;
        }

        // Insert delegate information into MongoDB
        const success = insertDel({ country: selectedCountry, roleCall: '' });
        console.log("success", success);
        if (success) {
          // Insertion was successful
          // Redirect to the delegate page or perform any other actions
          navigate('/waiting'); 
        } else {
          // Item already exists, handle accordingly
          //console.log('Delegate already exists for the selected country.');
        }

  
      }
    })
  };

  return (
    <div className="all">
        
        <div className="header">
        <Header version={'blank'}/>
        </div>

        <div className="logo">
            <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />
        </div>

        <div className= "top">
            <h2 className="welcomeHeader">Welcome to United Nations</h2>
        </div>

        <div className="logins">
            <form className="container1">
            <div className="heading"> 
                <h1 className="diasAndDelegateHeader">Dias Login</h1>
                <img src={window.location.origin + '/images/lecturer.png'} width={45} height={65} alt="lecturerImage" />
            </div>
                    <div className="usernameLabel">
                        <h6 className="header6">Username</h6> 
                        <div className="input-box">
                            <input type="text" 
                            required
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <GavelIcon style={{ color: "white" }}/>
                    </div>

                    <div className="passwordLabel">
                        <h6 className="header6">Password</h6>
                        <div className="input-box">
                            <input type="password" 
                            required 
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <LockIcon style={{ color: "white" }}/>
                    </div>

                    <div className="diasButtons">
                      <CoolButton onClick={toRegister} buttonColor={'#00DB89'} textColor={'#FFFFFF'} buttonText={'Register'} />
                      <LoginButton loginFunc={diasLogin} errors={{'error':'Username or Password is Incorrect'}} buttonText='Login' buttonColor={'#FF9728'} textColor={'#FFFFFF'}/>
                    </div>
            </form>

            <div className="container2">
            <div className="heading">   
            <h1 className="diasAndDelegateHeader">Delegate Login</h1>
            <img src={window.location.origin + '/images/delegate.png'} width={45} height={63} alt="lecturerImage" />
            </div>
               
            <div className="countryLabel">
                <label htmlFor="country">Country</label>
                <select name="countries" id="countries">
                <option value="choice"></option>
                {generateCountryOptions()}
                </select>
                <PublicIcon style={{ color: "white" }} />
            </div>

                
                <div className="sessionLabel">
                    <h6 className="header6">Session ID</h6>
                    <div className="input-box">
                        <input type="text" required  id="sessionId"/>
                    </div>
                    <InfoIcon style={{ color: "white"}} />
                </div>

                <div className="submitButton">
                {/* <CoolButton buttonText={'Login'} onClick={loginDelegate} buttonColor={'#FF9728'} textColor="white" />                    <button type="submit">Login</button> */}
                <LoginButton loginFunc={loginDelegate} errors={{'error':'Incorrect session ID'}} buttonText='Login' buttonColor={'#FF9728'} textColor={'#FFFFFF'}/>

                    </div>

                </div>
                {/* TO import images, you can put the image in /public/images/ then import it with the following:
                 window.location.origin + '/images/YourImage.whatever*/}

        </div>
    </div>
    
    );
    
}
//           <button className="loginButton" type="submit">Login</button>

export default Home;

