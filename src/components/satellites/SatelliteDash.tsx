import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SatSearchBar from './SatSearchBar';
import LeafletMapCard from './LeafletMapCard';
import Paper from '@material-ui/core/Paper';

import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
  tabpanel: {
    height: "90vh"
  }
})

interface SatelliteDashProps {}

const SatelliteDash: React.FC<SatelliteDashProps> = (props) => {
  const [selectedSat, setSelectedSat] = useState<string>("");
  const [tab, setTab] = useState<string>("1");

  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={4} container>
          <Grid item xs={12}>
            <SatSearchBar onSelect={(value: string) => setSelectedSat(value)} />
          </Grid>
        </Grid>
        <Grid item xs={8} container>
          <Grid item xs={12}>
            <TabContext value={tab}>
              <Paper className={classes.tabpanel}>
                <TabList
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event: any, value: string) => setTab(value)}
                >
                  <Tab label="2D Visualisation" value="1"/>
                  <Tab label="3D Visualisation" value="2"/>
                </TabList>
              
              <TabPanel value="1">
                <LeafletMapCard noradID={selectedSat} />
              </TabPanel>
              <TabPanel value="2">

              </TabPanel>
              </Paper>
            </TabContext>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SatelliteDash;
