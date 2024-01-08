import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import '@mui/material/styles';
import theme from './theme.jsx'; // Import your custom theme
import { ThemeProvider } from '@emotion/react';
import { Route, Link, Routes, BrowserRouter } from 'react-router-dom';

// import the main pages we need
import Home from '../pages/Home.js';

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
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
