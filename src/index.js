import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/style.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffaa75',
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

