import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Typography } from '@mui/material';

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Typography>Test</Typography>
    <Hello/>
    <Info/>
  </div>
);
