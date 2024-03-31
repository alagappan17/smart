import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#000000', // Black for text on top of white
    },
    secondary: {
      main: '#000000',
      contrastText: '#ffffff', // White for text on top of black
    },
  },
  typography: {
    fontFamily: 'Barlow Condensed, sans-serif',
    h1: {
      fontWeight: 700, // Bold for larger headings
    },
    h2: {
      fontWeight: 500, // Medium weight for subheadings
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#000000', // Black for Input Label
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'white', // Keep the same background when not active
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          color: 'black',
          borderColor: 'black', // Slightly darker border for contrast
          textTransform: 'uppercase', // Avoid uppercase button labels
          borderRadius: 10, // Subtle rounded border
          border: '1px solid black', // Slightly thicker border
          '&:hover': {
            borderColor: 'black', // Darken the border
            backgroundColor: '#333131', // Darken the background
            color: 'white', // Lighten the text color
            transform: 'translate(-1px, -1px)',
            boxShadow: '5px 5px 0px 0px grey', // Slightly raised button
            transition: 'all 0.2s', // Smooth transition
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          style: { color: 'black' }, // Black for Input Label
        },
        InputProps: {
          style: { color: 'black', border: '1px solid black' }, // Black for input text
        },
      },
    },
  },
});

export default theme;
