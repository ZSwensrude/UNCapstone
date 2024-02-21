// theme.js
// This is mostly the default theme btw, we can change this later...

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a custom theme
let theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    htmlFontSize: 16,
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
      fontSize: '3rem',
      fontWeight: 800
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 400,
      color: 'white',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: 'white',
    },
    h6: {
      fontSize: '4rem',
      fontWeight: 400,
    }
    // Add more typography customizations as needed
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#ff0000', // RED????
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

theme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg', 'xl'], // Customize breakpoints if needed
  disableAlign: false, // Whether to disable the alignment correction
  factor: 2, // The factor by which the font size should be adjusted
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2'], // Typography variants to apply responsive font sizes
});

export default theme;
