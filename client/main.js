import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import '@mui/material/styles';
import theme from './theme.jsx'; // This is the MUI theme that we can use to set default colours and fonts
import { ThemeProvider } from '@emotion/react';
import { Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
//import Country from '../components/Country.js'
// import the css file
import './main.css';

// import the main pages we need 
import Home from '../pages/Home.js';
import Dias from '../pages/Dias.js';
import Delegate from '../pages/Delegate.js';
import Register from '../pages/Register.js';
import DiasHome from '../pages/DiasHomePage.js';
//import RollCall from '../pages/DelRollCall.js';
import Waiting from '../pages/Waiting.js';
import Presentation from '../pages/Presentation.js';
import showScreens from './showScreens.js';

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <div className='default'>
        <BrowserRouter>
          <Routes>
            {/* To add a new page, import the page element, create a new <Route/>, then add the path and element */}
            <Route exact path='/' element={<Home />} />
            {showScreens && <Route exact path='/dias' element={<Dias />} />}
            <Route exact path='/delegate' element={<Delegate />} />
            {showScreens && <Route exact path='/register' element={<Register />} />}
            <Route exact path='/dias-home-page' element={<DiasHome />} />
            <Route exact path='/waiting' element={<Waiting />} />
            <Route exact path='/presentation' element={<Presentation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}


// <Navbar />
//<Country/>
Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  Meteor.subscribe('userData');
  Meteor.subscribe('allUsers');
  root.render(<Main />);
});
