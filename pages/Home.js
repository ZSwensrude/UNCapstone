import { Typography } from "@mui/material";
import React from "react";
import './HomeIndex.css';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import UNLogo from './pictures'
import { Link } from 'react-router-dom';
const countries = ['Country','Canada', 'Brazil', 'UK', 'USA'];
import Dias from '../pages/Dias.js';

// Placeholder home screen
const Home = () => {
  return (
    <div className="all">

        <div className= "top">
            <h2>Welcome to Project Pitbull</h2>
        </div>

        <div className="logins">
            <div className="container1">
                <h1>Dias Login</h1>
                    <div className="usernameLabel">
                        <h6>Username</h6> 
                        <div className="input-box">
                            <input type="text" required />
                        </div>
                        <GavelIcon style={{ color: "white" }}/>
                    </div>

                    <div className="passwordLabel">
                        <h6>Password</h6>
                        <div className="input-box">
                            <input type="password" required />
                        </div>
                        <LockIcon style={{ color: "white" }}/>
                    </div>

                    <div className="diasButtons">
                    <button className="register" type="submit">Register</button>
                    <Link to={'/dias'}>
                    <button type="submit">Login</button>
                    </Link>
                    </div>
            </div>

            <div className="container2">
            <h1>Delegate Login</h1>

                <div className="countryLabel">
                <label for="cars">Country</label>
                <select name="countries" id="countries">
                    <option value="choice"></option>
                    <option value="canada">Canada</option>
                    <option value="united kingdom">United Kingdom</option>
                </select>
                <PublicIcon style={{ color: "white"}} />
                </div>
                
                <div className="sessionLabel">
                    <h6>Session ID</h6>
                    <div className="input-box">
                        <input type="text" required />
                    </div>
                    <InfoIcon style={{ color: "white"}} />
                </div>

                <div className="submitButton">
                    <button type="submit">Login</button>
                    </div>
                </div>
        </div>
    </div>
    
  );
  
}
/*
        <BrowserRouter>
        <Routes>
        <Route exact path='/dias' element={<Dias />} />
        </Routes>
        </BrowserRouter>
*/
//<img src={UNLogo} alt="logoImage" />
export default Home;

