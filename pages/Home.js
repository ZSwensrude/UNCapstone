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

const Home=()=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to a different route
    navigate('/delegate');
  };

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
        navigate('/dias-home-page');
      }
   })
   
  }

  return (
    <div className="all">

        <Header version={'blank'}/>
        <div className="logo">
            <img src={window.location.origin + '/images/UN_emblem_blue.png'} height={200} alt="logoImage" />
        </div>
        <div className= "top">
            <h2>Welcome to United Nations</h2>
        </div>
        

        <div className="logins">
            <form className="container1">
            <div className="heading"> 
                <h1>Dias Login</h1>
                <img src={window.location.origin + '/images/lecturer.png'} width={35} height={55} alt="lecturerImage" />
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
                      <LoginButton loginFunc={diasLogin} error='Username or Password is Incorrect' buttonText='Login' buttonColor={'#FF9728'} textColor={'#FFFFFF'}/>
                    </div>
            </form>

            <div className="container2">
            <div className="heading">   
            <h1>Delegate Login</h1>
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
                {/* <Link to={'/delegate'}> */}
                    <CoolButton buttonText={"Login"} onClick={handleClick} buttonColor={'#FF9728'} textColor='white' />
                    {/* <button type="submit">Login</button> */}
                {/* </Link> */}
                    </div>
                </div>
                {/* TO import images, you can put the image in /public/images/ then import it with the following:
                 window.location.origin + '/images/YourImage.whatever*/}

        </div>
    </div>
    
    );
    
}

export default Home;

