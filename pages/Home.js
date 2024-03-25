import { Meteor } from "meteor/meteor";
import { Paper, Typography, useRadioGroup, Modal } from "@mui/material";
import React, {useState, useEffect} from 'react';
import './HomeIndex.css';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import CoolButton from "../components/CoolButton";
import Header from "../components/Header";
import { useNavigate  } from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import countriesData from '../flags.json'  
//import { insertDel } from '../imports/api/delegates';
import showScreens from "../client/showScreens";
import { conferenceCollection ,insertDel } from "../imports/api/conference";

//import { LoginForm } from "../components/LoginForm";

Meteor.subscribe("conference")

const Home=()=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toRegister = () => {
    // Navigate to a different route
    Meteor.logout();
    navigate('/register');
  };

  // shows/hides the modal window
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const diasLogin = (modal, user = username, pass = password) => {

    // leaving this as normal meteor login, meaning that it uses the "user" db collection
    Meteor.loginWithPassword(user, pass, function(error) {

      if (error) {
         handleOpen();
      } else {
        navigate('/dias');
      }
   })

  };


  const generateCountryOptions = () => {
    return countriesData.countries.map((country, index) => (
      <option key={index} value={country.country}>
        {country.name}
      </option>
    ));
  };
 
  const loginDelegate = (modal) => {
    const selectedCountry = document.getElementById('countries').value;
    const sessionId = document.getElementById('sessionId').value;
    const username = selectedCountry + sessionId;
    const password = sessionId;
    
    const country = conferenceCollection.findOne({"delLogins.username": username});

    // we dont actually need to check the passwords anymore (huge waste of time)
    // the username is made from country + sessionid so if its right the password is
    if (country) {
      // Store user data in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify({ username, password, confID: sessionId, userType: 'delegate', country: selectedCountry }));

      // Insert delegate information into MongoDB
      const success = insertDel({ country: selectedCountry, roleCall: '', sessionId});
      if (success) {
        // Insertion was successful
        // Redirect to the delegate page or perform any other actions
        navigate('/waiting'); 
      } else {
        // Item already exists, handle accordingly
        //console.log('Delegate already exists for the selected country.');
      } 
    } else {
      // Check if the country is selected
      handleOpen();
    
    }
  };
  
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();

        // get selected country (checks if they are logging in as delegate)
        const selectedCountry = document.getElementById('countries').value;
        const userinput = document.getElementById('diasUser').value;
        const passinput = document.getElementById('diasPass').value;
        
        if (selectedCountry != "choice") {
          loginDelegate();
          // else check if they are trying to login as dias
        } else {
          diasLogin(null, userinput, passinput);
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="all">
      <Modal className="modalWindow" open={open} onClose={handleClose}>
        <Paper>
          <Typography>
            Error logging in.
          </Typography>
        </Paper>
      </Modal>
        
        <div className="header">
        <Header version={'blank'}/>
        </div>
        
        <div className= "top">
        {/* <h2 className="welcomeHeader1">Welcome to United Nations</h2> */}
        <div className="welcomeHeader1">
        <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={100} alt="logoImage" />

          <Typography variant="h6">Welcome to Mac-UN!</Typography>
        </div>
        </div>

        <div className="logins">
            <form className="homecontainer">
            <div className="heading"> 
                <h1 className="diasAndDelegateHeader">Dias Login</h1>
                <img className="loginimage"  src={window.location.origin + '/images/dias.png'} alt="lecturerImage" />
            </div>
                    <div className="usernameLabel">
                        <h6 className="header6">Username</h6> 
                        <div className="input-box">
                            <input type="text" 
                            required
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="diasUser"
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
                            id="diasPass"
                            />
                        </div>
                        <LockIcon style={{ color: "white" }}/>
                    </div>

                    <div className="diasButtons">
                      {showScreens && <CoolButton onClick={toRegister} buttonColor={'#00DB89'} textColor={'#FFFFFF'} buttonText={'Register'} />}
                      <LoginButton loginFunc={diasLogin} errors={{'error':'Username or Password is Incorrect'}} buttonText='Login' buttonColor={'#FF9728'} textColor={'#FFFFFF'}/>
                    </div>
            </form>

            <div className="homecontainer">
            <div className="heading">   
            <h1 className="diasAndDelegateHeader">Delegate Login</h1>
            <img className="loginimage" src={window.location.origin + '/images/delegate.png'} alt="lecturerImage" />
            </div>
               
            <div className=" usernameLabel">
              <h6 className="header6">Country</h6>
                <select className="input-box" name="countries" id="countries">
                <option value="choice"></option>
                {generateCountryOptions()}
                </select>
                <PublicIcon style={{ color: "white" }} />
            </div>

                
                <div className=" passwordLabel">
                    <h6 className="header6">Session ID</h6>
                    <div className="input-box">
                        <input type="text" required  id="sessionId"/>
                    </div>
                    <InfoIcon style={{ color: "white"}} />
                </div>

                <div className="submitButton">
                {/* <CoolButton buttonText={'Login'} onClick={loginDelegate} buttonColor={'#FF9728'} textColor="white" />                    <button type="submit">Login</button> */}
                <LoginButton loginFunc={loginDelegate} errors={{'error':'Country not selected or incorrect session ID'}} buttonText='Login' buttonColor={'#FF9728'} textColor={'#FFFFFF'}/>

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

/* I am keeping the old delegate meteor login code down here just in case we wanna use it again:
  Meteor.loginWithPassword(username, password, function(error) {         
    if (error) {
      modalOpen();
      console.log("ERROR LOGGING IN", error)
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
*/
