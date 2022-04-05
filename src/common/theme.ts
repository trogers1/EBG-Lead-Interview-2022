import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    text: {
      primary: '#212B48',
      secondary: '#6F6F6F',
    },
    primary: {
      main: '#212B48',
    },
    secondary: {
      main: '#6F6F6F',
    },
    error: {
      main: red.A400,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
