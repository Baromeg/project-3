import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

// The API is at '/api/locations'

const Locations = () => {
  const [locationData, updateLocationData] = useState([])
  const [locationFilter, updateLocationFilter] = useState("")
  const [selectedCategory, updateSelectedCategory] = useState("")

  useEffect(() => {
    axios.get("/api/locations").then((axiosResp) => {
      updateLocationData(axiosResp.data)
    })
  }, [])

  function filterLocations() {
    const filteredLocations = locationData.filter((location) => {
      const name = location.name.toLowerCase()
      const filterText = locationFilter.toLowerCase()
      return (
        name.includes(filterText) &&
        (selectedCategory === "" || location.category[0] === selectedCategory)
      )
    })
    return filteredLocations
  }

  function getCategories() {
    const mappedCategories = locationData.map(
      (location) => location.category[0]
    )
    const uniqueCategories = new Set(mappedCategories)
    const arrayLocations = Array.from(uniqueCategories)
    // console.log(mappedCategories)
    // console.log(uniqueCategories)
    // console.log(arrayLocations)
    return arrayLocations
  }

  if (!locationData) {
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
    <div className='section'>
      <div className='container'>
        <input
          className='input mb-2'
          placeholder='Search...'
          onChange={(event) => updateLocationFilter(event.target.value)}
          value={locationFilter}
        />
        {/* <div className="level is-mobile"> */}
        <div className='buttons are-small is-centered'>
          {getCategories().map((category, index) => {
            return (
              <button
                // <div className="level-item">

                key={index}
                onClick={(event) =>
                  updateSelectedCategory(event.target.innerHTML)
                }
                className='button is-link m-2 has-text-weight-semibold'
              >
                {category}
              </button>
            )
            // </div>
          })}
        </div>

        {/* </div> */}
        {/*<div className="container">*/}
        <div className='notifications is-primary'>
          {filterLocations().map((location, index) => {
            return (
              <div key={index}>
                <Link to={`/locations/${location._id}`}>
                  <div className='tile is-parent px-0'>
                    <div className='tile is-child box'>
                      <div className='columns'>
                        <div className='column'>
                          {/*<div className="">*/}
                          {/*<div className="">*/}
                          <p className='title is-4'>{location.name}</p>
                          {/*<p className="subtitle is-6" className="locationsTitle">{'Category: ' + location.category}</p>*/}
                          <div className='tags'>
                            {location.category.map((category, index) => {
                              return (
                                <div className='tag is-warning' key={index}>
                                  {category}
                                </div>
                              )
                            })}
                          </div>
                          {/*<p className="subtitle is-6">{'Address: ' + location.address}</p>*/}
                          <p className='subtitle is-6'>
                            <strong>City: </strong>
                            {location.city}
                          </p>
                          {/*<p className="subtitle is-6">{'Postcode: ' + location.postcode}</p>*/}
                          {/*<p className="subtitle is-6">{'Timings: ' + location.timings}</p>*/}
                          {/*<p className="subtitle is-6">{'Website: ' + location.website}</p>*/}
                          {location.bio && (
                            <p className='subtitle is-6'>
                              <strong>About: </strong> {location.bio}
                            </p>
                          )}
                        </div>
                        <div className='column has-text-centered'>
                          {location.image && (
                            <img
                              className='locationsImage'
                              src={location.image}
                              alt={location.name}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className="tile is-child box"> */}
                    {/*<div className="">*/}
                    {/*<div className="">*/}
                    {/* <p className="title is-4">{location.name}</p> */}
                    {/*<p className="subtitle is-6" className="locationsTitle">{'Category: ' + location.category}</p>*/}
                    {/* <div className="tags">
                    {location.category.map((category, index) => {
                      return <div className="tag is-warning" key={index}>
                        {category}
                      </div>
                    })}
                  </div> */}
                    {/*<p className="subtitle is-6">{'Address: ' + location.address}</p>*/}
                    {/* <p className="subtitle is-6">{'City: ' + location.city}</p> */}
                    {/*<p className="subtitle is-6">{'Postcode: ' + location.postcode}</p>*/}
                    {/*<p className="subtitle is-6">{'Timings: ' + location.timings}</p>*/}
                    {/*<p className="subtitle is-6">{'Website: ' + location.website}</p>*/}
                    {/* {location.bio && <p className="subtitle is-6">{'About: ' + location.bio}</p>}
                </div> */}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="tile is-child box">*/}
                    {/*<figure className="image is-4by3">*/}
                    {/* {location.image && <img className="locationsImage" src={location.image} alt={location.name} />} */}
                    {/*</figure>*/}
                    {/*</div>*/}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Locations
