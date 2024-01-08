import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import '@mui/material/styles';
import theme from './theme.jsx'; // Import your custom theme
import { ThemeProvider } from '@emotion/react';
import { Route, Link, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

// import the main pages we need
import Home from '../pages/Home.js';
import Dias from '../pages/Dias.js';
import Delegate from '../pages/Delegate.js';

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* To add a new page, import the page element, create a new <Route/>, then add the path and element */}
          <Route exact path='/' element={<Home />} />
          <Route exact path='/dias' element={<Dias />} />
          <Route exact path='/delegate' element={<Delegate />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<Main />);
});
