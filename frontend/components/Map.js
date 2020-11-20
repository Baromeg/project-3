import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far, faEdit, faMapPin } from '@fortawesome/free-solid-svg-icons'
import MapGL, { Marker } from 'react-map-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
const Map = (props) => {
  console.log(props)

  const [viewPort, setViewPort] = useState({
    height: '250px',
    // width: '57rem',
    width: '52rem',

    zoom: 15,
    latitude: props.location.latitude,
    longitude: props.location.longitude
  })

  return <MapGL
    mapboxApiAccessToken={'pk.eyJ1Ijoibmlja2hheWVzIiwiYSI6ImNrYmh2dW56NDA5ZnIyenB2MHJ4MGFnaWYifQ.IHXzZRvdxBtuH9Ro6nLKmQ'}
    scrollZoom={false}
    {...viewPort}
    onViewportChange={(viewPort) => setViewPort(viewPort)}
  >

    <Marker
      latitude={props.location.latitude}
      longitude={props.location.longitude}
    >
      <div>
        <FontAwesomeIcon color="green" icon={faMapPin} />
        <span> {props.location.name} </span>

      </div>
    </Marker>
  </MapGL >
}

export default Map