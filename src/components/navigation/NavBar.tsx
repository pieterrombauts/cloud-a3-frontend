import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import React from 'react';

const useStyles = makeStyles({
  btn: {
    marginLeft: "20px",
  }
});


interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Space Information Dashboard
        </Typography>
        <Button variant="contained" color="primary" className={classes.btn} disableElevation href="/satellites">
            Satellites
          </Button>
          <Button variant="contained" color="primary" className={classes.btn} disableElevation href="/weather">
            Space Weather
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;