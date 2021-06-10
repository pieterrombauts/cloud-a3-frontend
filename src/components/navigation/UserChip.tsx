import { Avatar, Button, Chip, makeStyles } from '@material-ui/core'
import { me } from 'api/auth/queries'
import { isLoggedIn } from 'api/auth/tokens'
import { Paths } from 'Paths'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link as RouterLink } from 'react-router-dom'

interface UserChipProps {}

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
})

export const UserChip: React.FC<UserChipProps> = ({}) => {
  // isLoggedIn()
  const classes = useStyles()
  const {
    data: user,
    isLoading,
    error,
  } = useQuery('me', me, { enabled: isLoggedIn() })

  if (isLoading || !user || error) {
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        disableElevation
        component={RouterLink}
        to={Paths.LOGIN}
      >
        Login
      </Button>
    )
  }
  return (
    <>
      <Chip
        className={classes.user}
        avatar={<Avatar />}
        label={`${user?.firstName} ${user?.lastName}`}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        disableElevation
        component={RouterLink}
        to={Paths.LOGOUT}
      >
        Log out
      </Button>
    </>
  )
}
