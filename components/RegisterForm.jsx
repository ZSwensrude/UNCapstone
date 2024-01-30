import React, {useState} from 'react';
import { diasCollection } from '/imports/api/dias';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import LoginButton from './LoginButton';

export const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const register = (openModal) => {
    
        var info = {
          username: username.trim(),
          password: password1.trim()
        };

        Accounts.createUser(info, function(error) {
         
            if (error) {
               openModal();
            } else {
              navigate('/dias-home-page');
            }
         });
      };

    return (
        <form className="regContainer">
          <h1 className="regHeader1">Register</h1>
          <div className="inputRegister">
              <h6 className="regHeader6">Username</h6> 
              <input className="inputBoxRegister" 
              type="text" 
              required
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
                />
          </div>
          <div className="inputRegister">
              <h6 className="regHeader6">Password</h6>
              <input className="inputBoxRegister" 
              type="password" 
              required 
              value = {password1}
              onChange={(e) => setPassword1(e.target.value)}/>
          </div>
          <div className="inputRegister">
              <h6 className="regHeader6">Re-Enter Password</h6>
              <input className="inputBoxRegister" 
              type="password" 
              required 
              value = {password2}
              onChange={(e) => setPassword2(e.target.value)}/>
          </div>
          <div id='buttonRegister'>
            <LoginButton id='buttonRegister' loginFunc={register} buttonText={'Create Account'} buttonColor={'#00DB89'} textColor={'#FFFFFF'} error={'Registration failed'} />
          </div>
        </form>
    );
};