import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from 'components/navigation/NavBar';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SpaceWeatherDash from 'components/spaceweather/SpaceWeatherDash';
import { makeStyles } from '@material-ui/styles';
import Login from 'components/login/Login';
import Register from 'components/login/Register';
import SatelliteDash from 'components/satellites/SatelliteDash';

const useStyles = makeStyles({
  app: {
    
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Route path="/weather">
          <SpaceWeatherDash />
        </Route>
        <Route path="/satellites">
          <SatelliteDash />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          
        </Route>
      </Router>
    </div>
  );
}

export default App;
