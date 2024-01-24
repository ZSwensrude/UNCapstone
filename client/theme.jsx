// theme.js
// This is mostly the default theme btw, we can change this later...

import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: 'black'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '48px',
      fontWeight: 800
    },
    h4: {
      fontSize: '36px',
      fontWeight: 400,
      color: 'white',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 600,
      color: 'white',
    }
    // Add more typography customizations as needed
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#009edb', // Blue color for primary elements
    },
    secondary: {
      main: '#800000', // Pink color for secondary elements
    },
    // Add more palette customizations as needed
    background: {
      default: '#f0f0f0'
    },
    orange: {
      main: '#FF9728'
    }
  },
  // Add more customizations like spacing, breakpoints, etc.
});

export default theme;
