import React, { useState, useEffect } from "react"

import ReactMapGL, { Marker, Popup } from "react-map-gl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

import { Link } from "react-router-dom"

import { usePosition } from "use-position"

const MapPage = (props) => {
  const homeLat = Number(localStorage.getItem("lat"))
  const homeLong = Number(localStorage.getItem("long"))
  //  Data from our API

  const [locationData, updateLocationData] = useState([])
  const [popup, setPopup] = useState(null)

  // Capturing browser location using usePosition

  const { latitude, longitude, error } = usePosition()

  // Capturing input from postcode search

  const [searchText, updateSearchText] = useState("")

  // Fetching data from our API to display locations on map

  useEffect(() => {
    axios.get("/api/locations").then((axiosResp) => {
      updateLocationData(axiosResp.data)
    })
  }, [])

  //  Setting iniitial position of map on page load

  const [viewPort, setViewPort] = useState({
    height: "100vh",
    width: "100vw",
    zoom: homeLat ? 12 : 14,
    latitude: homeLat ? homeLat : 51.515,
    longitude: homeLong ? homeLong : -0.078,
  })

  // Updating position of map based on browser location

  function useLocation() {
    const newViewport = {
      ...viewPort,
      latitude: latitude,
      longitude: longitude,
      zoom: 12
    }
    setViewPort(newViewport)
  }

  // Updating position of map based on postcode search

  function handleSubmit() {
    event.preventDefault()
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${process.env.MapBoxKey}`
      )
      .then((resp) => {
        const postCodeViewPort = {
          ...viewPort,
          longitude: resp.data.features[0].center[0],
          latitude: resp.data.features[0].center[1],
        }
        setViewPort(postCodeViewPort)
      })
  }

  // Loading screen while waiting for fetch data

  if (!locationData[1]) {
    return (
      <div className='section'>
        <div className='container'>
          <div className='title'>Loading ...</div>
          <progress className='progress is-small is-link' max='100'>
            60%
          </progress>
        </div>
      </div>
    )
  }

  return (
    <div className='has-navbar-fixed-top'>
      <ReactMapGL
        mapboxApiAccessToken={process.env.MapBoxKey}
        {...viewPort}
        onViewportChange={(viewPort) => setViewPort(viewPort)}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >

        {locationData.map((location) => {
          if (location.latitude) {
            return (
              <Marker
                key={location._id}
                latitude={location.latitude}
                longitude={location.longitude}
              >
                <Link
                  to={`/locations/${location._id}`}
                >
                  <span
                    role="img"
                    aria-label="map-marker"
                    onMouseOver={() => setPopup(location)}
                    onMouseOut={() => setPopup(null)}
                  >
                    <FontAwesomeIcon style={{ color: "#056674" }}
                      icon={faMapPin} />
                  </span>
                </Link>
              </Marker>
            )
          }
        })}
        {popup &&
          <Popup
            scrollZoom={false}
            latitude={popup.latitude}
          longitude={popup.longitude}
          >
          <div id="popup">
              {popup.image && <figure className="popup-image">
                <img src={popup.image} alt={popup.name} width="150px" />
            </figure>}
              <div>
                <p className="title is-size-6">{popup.name}</p>
                <p className="subtitle is-size-7">{popup.category[0]}</p>
            </div>
          </div>
        </Popup>
        }

      </ReactMapGL>
      <nav className='navbar p-5 is-fixed-bottom'>
        <div className='navbar-start'>
          <div className='navbar-item'>
            <form onSubmit={handleSubmit}>
              <div className='field has-addons is-justify-content-center'>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    placeholder='Find by postcode'
                    onChange={(event) => updateSearchText(event.target.value)}
                    value={searchText}
                  />
                </div>
                <div className='control'>
                  <button className='button is-link'>Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <button onClick={useLocation} className='button is-link'>
              Use my location
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MapPage
