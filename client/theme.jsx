// theme.js
// This is the default theme btw, we can change this later...

import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
    },
    // Add more typography customizations as needed
  },
  palette: {
    primary: {
      main: '#1976d2', // Blue color for primary elements
    },
    secondary: {
      main: '#f50057', // Pink color for secondary elements
    },
    // Add more palette customizations as needed
  },
  // Add more customizations like spacing, breakpoints, etc.
});

export default theme;
