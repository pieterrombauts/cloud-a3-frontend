import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SatSearchBar from './SatSearchBar';
import SatelliteMap from './SatelliteMap';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';
import SatelliteGlobe from './SatelliteGlobe';
import SatPassesTable from './SatPassesTable';

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  tabpanel: {
    height: "80vh"
  }
})

interface SatelliteDashProps {}

const SatelliteDash: React.FC<SatelliteDashProps> = (props) => {
  const [selectedSat, setSelectedSat] = useState<{favourite:boolean, name: string, noradID: string}>({favourite: false, name: "", noradID: ""});
  const [tab, setTab] = useState<string>("1");
  const classes = useStyles();
    return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={4} container direction='column'>
            <SatSearchBar onSelect={(satellite: {favourite: boolean, name: string, noradID: string}) => setSelectedSat(satellite)} />
            <SatPassesTable satellite={selectedSat} />
        </Grid>
        <Grid item xs={8} container>
          <Grid item xs={12}>
            <Paper className={classes.tabpanel}>
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event: any, value: string) => setTab(value)}
              >
                <Tab label="2D Visualisation" value="1"/>
                <Tab label="3D Visualisation" value="2"/>
              </Tabs>
                <SatelliteMap noradID={selectedSat.noradID} visible={tab === "1"}/>
                <SatelliteGlobe noradID={selectedSat.noradID} visible={tab === "2"}/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SatelliteDash;
