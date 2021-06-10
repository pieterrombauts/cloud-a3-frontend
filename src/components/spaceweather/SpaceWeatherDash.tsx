import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PlanetaryKPCard from 'components/spaceweather/PlanetaryKPCard';
import SolarWindPlasmaDensCard from 'components/spaceweather/SolarWindPlasmaDensCard';
import SolarWindPlasmaTempCard from 'components/spaceweather/SolarWindPlasmaTempCard';
import SolarWindPlasmaVelCard from 'components/spaceweather/SolarWindPlasmaVelCard';
import ForecastPlanetaryKPCard from 'components/spaceweather/ForecastPlanetaryKPCard';
import GOESProtonFluxCard from 'components/spaceweather/GOESProtonFluxCard';
import GOESMagnetometersCard from 'components/spaceweather/GOESMagnetometersCard';
import GOESElectronFluxCard from 'components/spaceweather/GOESElectronFluxCard';
import GifCard from 'components/spaceweather/GifCard';
import { makeStyles } from '@material-ui/styles';
import AlertCard from './AlertCard';
import { NOAA_BASE_URL } from 'api/contants';

const useStyles = makeStyles({
  container: {
    padding: '20px 20px 0px 20px',
  },
});

interface SpaceWeatherDashProps {}

const SpaceWeatherDash: React.FC<SpaceWeatherDashProps> = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <PlanetaryKPCard />
        </Grid>
        <Grid item xs={3}>
          <SolarWindPlasmaDensCard />
        </Grid>
        <Grid item xs={3}>
          <SolarWindPlasmaVelCard />
        </Grid>
        <Grid item xs={3}>
          <SolarWindPlasmaTempCard />
        </Grid>
        <Grid item xs={3}>
          <ForecastPlanetaryKPCard />
        </Grid>
        <Grid item xs={3}>
          <GOESProtonFluxCard />
        </Grid>
        <Grid item xs={3}>
          <GOESMagnetometersCard />
        </Grid>
        <Grid item xs={3}>
          <GOESElectronFluxCard />
        </Grid>
        <Grid item xs={2}>
          <GifCard
            id="LASCO-C2"
            url={`${NOAA_BASE_URL}/products/animations/lasco-c2.json`}
            width={300}
            height={300}
          />
        </Grid>
        <Grid item xs={2}>
          <GifCard
            id="LASCO-C3"
            url={`${NOAA_BASE_URL}/products/animations/lasco-c3.json`}
            width={300}
            height={300}
          />
        </Grid>
        <Grid item xs={2}>
          <GifCard
            id="SUVI-171"
            url={`${NOAA_BASE_URL}/products/animations/suvi-primary-171.json`}
            width={300}
            height={300}
          />
        </Grid>
        <Grid item xs={2}>
          <GifCard
            id="SDO-HMII"
            url={`${NOAA_BASE_URL}/products/animations/sdo-hmii.json`}
            width={300}
            height={300}
          />
        </Grid>
        <Grid item xs={2}>
          <GifCard
            id="OVATION-N"
            url={`${NOAA_BASE_URL}/products/animations/ovation_north_24h.json`}
            width={300}
            height={300}
          />
        </Grid>
        <Grid item xs={2}>
          <AlertCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpaceWeatherDash;
