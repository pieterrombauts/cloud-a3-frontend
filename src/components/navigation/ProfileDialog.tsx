import { Avatar, Button, Chip, Dialog, DialogTitle, Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { User } from 'api/auth/queries';
import { AvatarUpload } from 'components/profile/AvatarUpload';
import React, { useState } from 'react';
import { UserChip } from './UserChip';

const useStyles = makeStyles({
  dialog: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    marginTop: "20px",
    fontWeight: "bold",
  }
});

interface ProfileDialogProps {
  userData: User | undefined;
  open: boolean;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = (props) => {
  const classes = useStyles();
  if (!props.userData) return (<></>);
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <div className={classes.dialog}>
      <AvatarUpload src={props.userData.avatar} />
      <Divider />
      <Typography className={classes.name} variant="subtitle1">{`${props.userData.firstName} ${props.userData.lastName}`}</Typography>
      <Typography variant="body1">{props.userData.email}</Typography>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;
