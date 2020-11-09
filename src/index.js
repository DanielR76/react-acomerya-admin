import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/style.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#607d8b',
    }
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root')
);

