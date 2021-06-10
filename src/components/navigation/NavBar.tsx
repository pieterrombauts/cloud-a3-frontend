import { Avatar, Button, Chip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { Face } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
  bar: {
    display: "flex",
    justifyContent: "space-between"
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  btn: {
    marginLeft: "20px",
  },
  user: {
    color: "white",
  },
  avatar: {

  }
});


interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.bar}>
        <div className={classes.left}>
          <Typography variant="h6">
            Space Information Dashboard
          </Typography>
          <Button variant="contained" color="primary" className={classes.btn} disableElevation href="/satellites">
            Satellites
          </Button>
          <Button variant="contained" color="primary" className={classes.btn} disableElevation href="/weather">
            Space Weather
          </Button>
        </div>
        <div className={classes.right}>
          <Chip
            className={classes.user}
            avatar={<Avatar />}
            label="Pieter Rombauts"
            variant="outlined"
          />
          <Button variant="contained" color="primary" className={classes.btn} disableElevation>
            Log Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;