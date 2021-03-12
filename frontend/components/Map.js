import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import ReactMapGL, { Marker } from "react-map-gl"
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css"
const Map = (props) => {
  console.log(props)

  const [viewPort, setViewPort] = useState({
    height: "250px",
    width: "52rem",
    zoom: 15,
    latitude: props.location.latitude,
    longitude: props.location.longitude
  })

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.MapBoxKey}
      scrollZoom={false}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      {...viewPort}
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >
      <Marker
        latitude={props.location.latitude}
        longitude={props.location.longitude}
      >
        <div>
          <FontAwesomeIcon style={{ color: "#056674" }} icon={faMapPin} />
          <span className='card'> {props.location.name} </span>
        </div>
      </Marker>
    </ReactMapGL>
  )
}

export default Map
