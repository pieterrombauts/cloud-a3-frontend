import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginRight: '20px',
  },
});

interface MapLoadingProps {}

const MapLoading: React.FC<MapLoadingProps> = (props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.text}>
          Loading...
        </Typography>
        <CircularProgress color="primary" />
      </CardContent>
    </Card>
  );
};

export default MapLoading;
