import React, { useCallback, useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import GoogleMapReact from 'google-map-react'
import {
  GoogleMap,
  LoadScript,
  OverlayView,
  Polyline,
} from '@react-google-maps/api'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import MapLoading from './MapLoading'
import { CORS_ANYWHERE } from 'api/contants'

const useStyles = makeStyles({
  container: {
    height: '85vh',
  },
})

interface SatelliteMapProps {
  noradID: string
  visible: boolean
}

interface PositionType {
  satlatitude: number
  satlongitude: number
  sataltitude: number
  azimuth: number
  elevation: number
  ra: number
  dec: number
  timestamp: number
  eclipsed: boolean
}

interface PointType {
  lat: number
  lng: number
}

const defaultProps = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 2,
  style: {
    width: '100%',
    height: '100%',
  },
}

const SatelliteMap: React.FC<SatelliteMapProps> = (props) => {
  const classes = useStyles()
  const [points, setPoints] = useState<PointType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (props.noradID !== '') {
      setLoading(true)
      axios
        .get(
          `${CORS_ANYWHERE}/https://api.n2yo.com/rest/v1/satellite/positions/${props.noradID}/41.702/-76.014/0/12000/&apiKey=86G9FS-PZTG9E-AH6DUE-4Q1M`,
        )
        .then((response) => {
          let points = response.data.positions.map((point: PositionType) => ({
            lat: point.satlatitude,
            lng: point.satlongitude,
          }))
          setLoading(false)
          setPoints(points)
        })
    }
  }, [props.noradID])

  return (
    <div
      className={classes.container}
      style={{ display: props.visible ? 'block' : 'none' }}
    >
      <LoadScript googleMapsApiKey="AIzaSyApWZaXIJNGfx2KfL_kve1zt0ZrQRvZx34">
        <GoogleMap
          mapContainerStyle={defaultProps.style}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          onBoundsChanged={() => console.log('Bounds changed')}
        >
          {loading && (
            <OverlayView
              position={{ lat: 0, lng: 0 }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <MapLoading />
            </OverlayView>
          )}
          <Polyline path={points} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default SatelliteMap
