import React, { useCallback, useEffect, useState } from 'react'
import { Viewer, CzmlDataSource } from 'resium'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { DateTime } from 'luxon'
import MapLoading from './MapLoading'
import { CORS_ANYWHERE } from 'api/contants'

const useStyles = makeStyles({
  container: {
    height: '85vh',
  },
})

interface SatelliteGlobeProps {
  noradID: string
  visible: boolean
}

const SatelliteGlobe: React.FC<SatelliteGlobeProps> = (props) => {
  const classes = useStyles()
  const [czml, setCzml] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (props.noradID !== '') {
      setLoading(true)
      let startTime = DateTime.utc().toFormat('yyyy-MM-dd_HH:mm:ss')
      let endTime = DateTime.utc()
        .plus({ days: 1 })
        .toFormat('yyyy-MM-dd_HH:mm:ss')
      axios
        .get(
          `${CORS_ANYWHERE}/http://www.orbitalpredictor.com/api/predict_orbit/?sats=${props.noradID}&start=${startTime}&end=${endTime}&format=czml&type=orbit`,
        )
        .then((response) => {
          let czml = response.data
          setLoading(false)
          setCzml(czml)
        })
    }
  }, [props.noradID])

  return (
    <div
      className={classes.container}
      style={{ display: props.visible ? 'block' : 'none' }}
    >
      <Viewer
        style={{
          height: '100%',
        }}
      >
        <CzmlDataSource data={czml} />
      </Viewer>
    </div>
  )
}

export default SatelliteGlobe
