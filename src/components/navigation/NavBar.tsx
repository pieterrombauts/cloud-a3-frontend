import { Avatar, Button, Chip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Face } from '@material-ui/icons';
import { me, User } from 'api/auth/queries';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ProfileDialog from './ProfileDialog';
import { UserChip } from './UserChip';

const useStyles = makeStyles({
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    marginLeft: '20px',
  },
  user: {
    color: 'white',
  },
  avatar: {},
});

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, error, isLoading } = useQuery<User>('me', me);

  return (
    <AppBar position="static">
      <Toolbar className={classes.bar}>
        <div className={classes.left}>
          <Typography variant="h6">Space Information Dashboard</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            disableElevation
            href="/satellites"
          >
            Satellites
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            disableElevation
            href="/weather"
          >
            Space Weather
          </Button>
        </div>
        <div className={classes.right}>
          <UserChip onClick={() => setDialogOpen(true)}/>
        </div>
        <ProfileDialog userData={data} onClose={() => setDialogOpen(false)} open={dialogOpen} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
