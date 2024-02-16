import React from "react";
import CoolButton from './CoolButton';
import { useNavigate  } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    // remove from db if we wanna
    navigate('/');
  }

  return(
    <div id='logoutButton'>
      <CoolButton buttonColor={'white'} buttonText={'logout'} onClick={onLogout} />
    </div>
  );
};

export default LogoutButton;