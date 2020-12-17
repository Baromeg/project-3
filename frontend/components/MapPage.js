import React, { useState, useEffect } from 'react'

import MapGL, { Marker } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far, faEdit, faMapPin } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { usePosition } from 'use-position'

const MapPage = (props) => {

  const homeLat = Number(localStorage.getItem('lat'))
  const homeLong = Number(localStorage.getItem('long'))
  //  Data from our API

  const [locationData, updateLocationData] = useState([])

  // Capturing browser location using usePosition

  const { latitude, longitude, error } = usePosition()

  // Capturing input from postcode search

  const [searchText, updateSearchText] = useState('')

  // Fetching data from our API to display locations on map

  useEffect(() => {
    axios.get('/api/locations')
      .then(axiosResp => {
        updateLocationData(axiosResp.data)

      })
  }, [])


  //  Setting iniitial position of map on page load


  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: (homeLat ? 12 : 14),
    latitude: (homeLat ? homeLat : 51.515),
    longitude: (homeLong ? homeLong : -0.078)
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
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${process.env.MapBoxKey}`)
      .then(resp => {
        const postCodeViewPort = {
          ...viewPort,
          longitude: resp.data.features[0].center[0],
          latitude: resp.data.features[0].center[1]
        }
        setViewPort(postCodeViewPort)

      })
  }

  // Loading screen while waiting for fetch data

  if (!locationData[1]) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-link" max="100">60%</progress>
      </div>
    </div>
  }


  return <div className="has-navbar-fixed-top">
    <MapGL
      mapboxApiAccessToken={'pk.eyJ1Ijoibmlja2hheWVzIiwiYSI6ImNrYmh2dW56NDA5ZnIyenB2MHJ4MGFnaWYifQ.IHXzZRvdxBtuH9Ro6nLKmQ'}
      // mapboxApiAccessToken={process.env.MapBoxKey}
      {...viewPort}
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >
      {/* Mapping data from our API to display locations - NOT FINISHED!! */}

      {locationData.map(location => {
        if (location.latitude) {
          return <Marker
            key={location._id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <Link
              className="card is-warning"
              to={`/locations/${location._id}`}>
              <FontAwesomeIcon color="green" icon={faMapPin} /> <span> {location.name} </span>
              {/* <div className="card">
                <div className="card-content p-2">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-32x32">
                        <img src={location.image} alt={location.name} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-size-6">{location.name}</p>
                      <p className="subtitle is-size-7">{location.category[0]}</p>
                    </div>
                  </div>

                </div>
              </div> */}
            </Link>
          </Marker>
        }

      })}

    </MapGL >
    <nav className="navbar p-5 is-fixed-bottom">
      <div className="navbar-start">
        <div className="navbar-item">
          <form onSubmit={handleSubmit}>
            <div className="field has-addons is-justify-content-center">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Find by postcode"
                  onChange={(event) => updateSearchText(event.target.value)}
                  value={searchText}
                />
              </div>
              <div className="control">
                <button className="button is-link">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <button onClick={useLocation} className="button is-link">
            Use my location
          </button>
        </div>
      </div>
    </nav>
  </div>
}

export default MapPage