import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import {
  NASA_API_KEY,
  NASA_BASE_URL,
  SWS_BOM_API_KEY,
  SWS_BOM_BASE_URL,
} from 'api/contants';

const useStyles = makeStyles({
  alert: {
    marginBottom: '5px',
  },
});

interface AlertCardProps {}

const AlertCard: React.FC<AlertCardProps> = (props) => {
  const classes = useStyles();
  const [magAlerts, setMagAlerts] = useState<number>(0);
  const [magWarnings, setMagWarnings] = useState<number>(0);
  const [flareWarnings, setFlareWarnings] = useState<number>(0);
  const [cmeWarnings, setCmeWarnings] = useState<number>(0);
  const [sepWarnings, setSepWarnings] = useState<number>(0);
  useEffect(() => {
    axios
      .post(`${SWS_BOM_BASE_URL}/api/v1/get-mag-alert`, {
        api_key: SWS_BOM_API_KEY,
      })
      .then((response) => {
        setMagAlerts(response.data.data.length);
      });
    axios
      .post(`${SWS_BOM_BASE_URL}/api/v1/get-mag-warning`, {
        api_key: SWS_BOM_API_KEY,
      })
      .then((response) => {
        setMagWarnings(response.data.data.length);
      });
    axios
      .get(`${NASA_BASE_URL}/DONKI/FLR?&api_key=${NASA_API_KEY}`)
      .then((response) => {
        setFlareWarnings(response.data.length);
      });
    axios
      .get(`${NASA_BASE_URL}/DONKI/CME?&api_key=${NASA_API_KEY}`)
      .then((response) => {
        setCmeWarnings(response.data.length);
      });
    axios
      .get(`${NASA_BASE_URL}/DONKI/SEP?&api_key=${NASA_API_KEY}`)
      .then((response) => {
        setSepWarnings(response.data.length);
      });
  }, []);
  return (
    <Card>
      <CardContent>
        <Alert
          className={classes.alert}
          severity={magAlerts ? 'warning' : 'success'}
        >
          {`There ${
            magAlerts === 1 ? 'is' : 'are'
          } ${magAlerts} magnetic alert${magAlerts === 1 ? '' : 's'}.`}
        </Alert>
        <Alert
          className={classes.alert}
          severity={magWarnings ? 'warning' : 'success'}
        >
          {`There ${
            magWarnings === 1 ? 'is' : 'are'
          } ${magWarnings} magnetic warning${magWarnings === 1 ? '' : 's'}.`}
        </Alert>
        <Alert
          className={classes.alert}
          severity={flareWarnings ? 'warning' : 'success'}
        >
          {`There ${
            flareWarnings === 1 ? 'is' : 'are'
          } ${flareWarnings} flare warning${flareWarnings === 1 ? '' : 's'}.`}
        </Alert>
        <Alert
          className={classes.alert}
          severity={cmeWarnings ? 'warning' : 'success'}
        >
          {`There ${
            cmeWarnings === 1 ? 'is' : 'are'
          } ${cmeWarnings} CME warning${cmeWarnings === 1 ? '' : 's'}.`}
        </Alert>
        <Alert
          className={classes.alert}
          severity={sepWarnings ? 'warning' : 'success'}
        >
          {`There ${
            sepWarnings === 1 ? 'is' : 'are'
          } ${sepWarnings} SEP warning${sepWarnings === 1 ? '' : 's'}.`}
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
