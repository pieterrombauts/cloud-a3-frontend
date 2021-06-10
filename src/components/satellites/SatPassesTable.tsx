import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'
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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DateTime } from 'luxon'
import { Favorite } from '@material-ui/icons'
import { CORS_ANYWHERE } from 'api/contants'

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
})

interface SatPassType {
  startAz: number
  startAzCompass: string
  startUTC: number
  maxAz: number
  maxAzCompass: string
  maxEl: number
  maxUTC: number
  endAz: number
  endAzCompass: string
  endUTC: number
}

interface SatDataType {
  type: string
  direction: string
  startTime: DateTime
  endTime: DateTime
  totalTime: number
}

interface SatPassesTableProps {
  satellite: { name: string; noradID: string }
}

const dateSort = (a: DateTime, b: DateTime) => {
  if (a < b) return -1
  if (a > b) return 1
  else return 0
}

const SatPassesTable: React.FC<SatPassesTableProps> = (props) => {
  const classes = useStyles()
  const [userLoc, setUserLoc] = useState<GeolocationPosition | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [radio, setRadio] = useState<SatDataType[]>([])
  const [visual, setVisual] = useState<SatDataType[]>([])
  const [rows, setRows] = useState<SatDataType[]>([])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => setUserLoc(pos))
  }, [])
  useEffect(() => {
    let radiorows = radio ? radio : []
    let visualrows = visual ? visual : []
    let combined = [...radiorows, ...visualrows].sort((a, b) =>
      dateSort(a.startTime, b.startTime),
    )
    setRows(combined)
  }, [radio, visual])
  useEffect(() => {
    if (userLoc !== null) {
      let lat = userLoc.coords.latitude.toFixed(3)
      let lng = userLoc.coords.longitude.toFixed(3)
      setLoading(true)
      axios
        .get(
          `${CORS_ANYWHERE}/https://api.n2yo.com/rest/v1/satellite/radiopasses/${props.satellite.noradID}/${lat}/${lng}/0/7/60/&apiKey=86G9FS-PZTG9E-AH6DUE-4Q1M`,
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
            )
            setRadio(radiopasses)
          }
        })
      axios
        .get(
          `${CORS_ANYWHERE}/https://api.n2yo.com/rest/v1/satellite/visualpasses/${props.satellite.noradID}/${lat}/${lng}/0/7/60/&apiKey=86G9FS-PZTG9E-AH6DUE-4Q1M`,
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
            )
            setVisual(visualpasses)
          }
        })
      setLoading(false)
    }
  }, [props.satellite.noradID])
  return (
    <Card className={classes.container}>
      <CardContent>
        {props.satellite.noradID !== '' && (
          <div className={classes.head}>
            <Typography
              className={classes.heading}
              variant="h6"
            >{`${props.satellite.name} [${props.satellite.noradID}]`}</Typography>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              href="/weather"
            >
              <Favorite fontSize="inherit" className={classes.icon} />
              Favourite
            </Button>
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
                  {console.log(row)}
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
              {rows.length === 0 && props.satellite.noradID !== '' && (
                <TableRow>
                  <TableCell colSpan={5}>
                    There are no passes in the next week for this satellite.
                  </TableCell>
                </TableRow>
              )}
              {props.satellite.noradID === '' && (
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
  )
}

export default SatPassesTable
