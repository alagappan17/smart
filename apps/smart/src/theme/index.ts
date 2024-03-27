import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      contrastText: '#000000', // Black for text on top of white
    },
    secondary: {
      main: '#000000',
      contrastText: '#ffffff', // White for text on top of black
    },
    background: {
      default: '#121212', // Slightly off-black background for contrast
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
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderColor: 'black', // Slightly darker border for contrast
          textTransform: 'uppercase', // Avoid uppercase button labels
          borderRadius: 10, // Subtle rounded border
          border: '1px solid black', // Slightly thicker border
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          style: { color: '#000000' }, // Black for Input Label
        },
        InputProps: {
          style: { color: '#000000', border: '1px solid black' }, // Black for input text
        },
      },
    },
  },
});

export default theme;
