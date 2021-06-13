import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import { Cancel, Favorite } from '@material-ui/icons';
import { API_GATEWAY_URL, CORS_ANYWHERE } from 'api/contants';
import { useLoginContext } from 'components/login/UserContext';
import { SatOptionType } from 'api/auth/queries';
import { useQueryClient } from 'react-query';
import { withAuth } from 'api/auth/tokens';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  table: {},
  icon: {
    marginRight: '5px',
  },
  heading: {
    marginLeft: '10px',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
});

interface SatPassType {
  startAz: number;
  startAzCompass: string;
  startUTC: number;
  maxAz: number;
  maxAzCompass: string;
  maxEl: number;
  maxUTC: number;
  endAz: number;
  endAzCompass: string;
  endUTC: number;
}

interface SatDataType {
  type: string;
  direction: string;
  startTime: DateTime;
  endTime: DateTime;
  totalTime: number;
}

interface SatPassesTableProps {
  satellite: SatOptionType;
}

const dateSort = (a: DateTime, b: DateTime) => {
  if (a < b) return -1;
  if (a > b) return 1;
  else return 0;
};

const SatPassesTable: React.FC<SatPassesTableProps> = (props) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { loggedIn } = useLoginContext();
  const [userLoc, setUserLoc] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [radio, setRadio] = useState<SatDataType[]>([]);
  const [visual, setVisual] = useState<SatDataType[]>([]);
  const [rows, setRows] = useState<SatDataType[]>([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => setUserLoc(pos));
  }, []);
  useEffect(() => {
    let radiorows = radio ? radio : [];
    let visualrows = visual ? visual : [];
    let combined = [...radiorows, ...visualrows].sort((a, b) =>
      dateSort(a.startTime, b.startTime),
    );
    setRows(combined);
  }, [radio, visual]);
  useEffect(() => {
    let lat = "-37.813";
    let lng = "144.963";
    if (userLoc !== null) {
      lat = userLoc.coords.latitude.toFixed(3);
      lng = userLoc.coords.longitude.toFixed(3);
    }
    setLoading(true);
      axios
        .get(
          `${CORS_ANYWHERE}/https://api.n2yo.com/rest/v1/satellite/radiopasses/${props.satellite.id}/${lat}/${lng}/0/7/60/&apiKey=86G9FS-PZTG9E-AH6DUE-4Q1M`,
        )
        .then((response) => {
          if (
            response.data.passes !== undefined ||
            response.data.passes !== null
          ) {
            let radiopasses = response.data.passes?.map(
              (point: SatPassType) => ({
                type: 'Radio',
                direction: point.startAzCompass + ' - ' + point.endAzCompass,
                startTime: DateTime.fromSeconds(point.startUTC),
                endTime: DateTime.fromSeconds(point.endUTC),
                totalTime: point.endUTC - point.startUTC,
              }),
            );
            setRadio(radiopasses);
          }
        });
      axios
        .get(
          `${CORS_ANYWHERE}/https://api.n2yo.com/rest/v1/satellite/visualpasses/${props.satellite.id}/${lat}/${lng}/0/7/60/&apiKey=86G9FS-PZTG9E-AH6DUE-4Q1M`,
        )
        .then((response) => {
          if (
            response.data.passes !== undefined ||
            response.data.passes !== null
          ) {
            let visualpasses = response.data.passes?.map(
              (point: SatPassType) => ({
                type: 'Visual',
                direction: point.startAzCompass + ' - ' + point.endAzCompass,
                startTime: DateTime.fromSeconds(point.startUTC),
                endTime: DateTime.fromSeconds(point.endUTC),
                totalTime: point.endUTC - point.startUTC,
              }),
            );
            setVisual(visualpasses);
          }
        });
      setLoading(false);
  }, [props.satellite.id]);

  const handleFavourite = () => {
    withAuth(axios).post(`${API_GATEWAY_URL}/favouriteSatellite`,{
      id: props.satellite.id,
      name: props.satellite.name
    }).then((res) => {
      queryClient.invalidateQueries("me");
    })
  }
  
  const handleUnfavourite = () => {
    withAuth(axios).delete(`${API_GATEWAY_URL}/favouriteSatellite`, { data: {
      id: props.satellite.id
    }}).then((res) => {
      queryClient.invalidateQueries("me");
    })
  }
  
  return (
    <Card className={classes.container}>
      <CardContent>
        {props.satellite.id !== '' && (
          <div className={classes.head}>
            <Typography
              className={classes.heading}
              variant="h6"
            >{`${props.satellite.name} [${props.satellite.id}]`}</Typography>
            {loggedIn && (props.satellite.favourite ? (
              <Button variant="contained" disableElevation onClick={handleUnfavourite}>
                <Cancel fontSize="inherit" className={classes.icon} />
                Unfavourite
              </Button>
            ) : (
              <Button variant="contained" color="secondary" disableElevation onClick={handleFavourite}>
                <Favorite fontSize="inherit" className={classes.icon} />
                Favourite
              </Button>
            ))}
          </div>
        )}
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type of pass</TableCell>
                <TableCell>Direction</TableCell>
                <TableCell>Start time</TableCell>
                <TableCell>End time</TableCell>
                <TableCell>Total time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: SatDataType) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell>{row.direction}</TableCell>
                  <TableCell>
                    {row.startTime.toFormat('MMM dd, HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {row.endTime.toFormat('MMM dd, HH:mm:ss')}
                  </TableCell>
                  <TableCell>{row.totalTime + ' s'}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && props.satellite.id !== '' && (
                <TableRow>
                  <TableCell colSpan={5}>
                    There are no passes in the next week for this satellite.
                  </TableCell>
                </TableRow>
              )}
              {props.satellite.id === '' && (
                <TableRow>
                  <TableCell colSpan={5}>
                    Search for a satellite to see results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SatPassesTable;
