import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Avatar, AvatarProps, ButtonBase } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { uploadAvatar } from 'api/user/mutations';
import { useQueryClient } from 'react-query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    button: {
      borderRadius: '100%',
      overflow: 'hidden',
      position: 'relative',
      '&::after': {
        background: '#000',
        position: 'absolute',
        content: '" "',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
        transition: '0.3s all',
      },
      '&:hover': {
        '&::after': {
          opacity: 0.5,
        },
        '& $hoverIcon': {
          opacity: 1,
        },
      },
    },
    hoverIcon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      color: 'white',
      opacity: 0,
      transition: '0.3s all',
      fontSize: 36,
    },
    avatar: {
      width: 120,
      height: 120,
    },
  }),
);

export const AvatarUpload: React.FC<AvatarProps> = (props) => {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        await uploadAvatar(file);
        queryClient.invalidateQueries('me');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <ButtonBase color="primary" component="span" className={classes.button}>
          <Avatar {...props} className={classes.avatar} />
          <PublishIcon className={classes.hoverIcon} />
        </ButtonBase>
      </label>
    </div>
  );
};
