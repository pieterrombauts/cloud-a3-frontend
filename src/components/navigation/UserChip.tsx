import { Avatar, Button, Chip, makeStyles } from '@material-ui/core';
import { me } from 'api/auth/queries';
import { isLoggedIn } from 'api/auth/tokens';
import { useLoginContext } from 'components/login/UserContext';
import { Paths } from 'Paths';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';

interface UserChipProps {
  onClick: () => void;
}

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

export const UserChip: React.FC<UserChipProps> = ( props ) => {
  const classes = useStyles();
  const { loggedIn } = useLoginContext();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery('me', me, { enabled: loggedIn });

  if (!loggedIn || isLoading || !user || error) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          disableElevation
          href={Paths.LOGIN}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          disableElevation
          href={Paths.REGISTER}
        >
          Register
        </Button>
      </>
    );
  }
  return (
    <>
      <Chip
        className={classes.user}
        avatar={<Avatar src={user.avatar} />}
        label={`${user?.firstName} ${user?.lastName}`}
        variant="outlined"
        onClick={props.onClick}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        disableElevation
        href={Paths.LOGOUT}
      >
        Log out
      </Button>
    </>
  );
};
