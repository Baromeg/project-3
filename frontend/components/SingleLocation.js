import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Rater from 'react-rater'
import Map from './Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faAddressCard, faClock, faPhoneAlt, faGlobe, faMapMarkedAlt, faComments } from '@fortawesome/free-solid-svg-icons'

import '../../node_modules/react-rater/lib/react-rater.css'

const SingleLocation = (props) => {
  // * Identify the location accessed by the user
  const locationId = props.match.params.locationId
  
  // * UseStates for data, comments, ratings and errors
  const [location, updateLocation] = useState([])
  const [formData, updateFormData] = useState({
    text: '',
    rating: null
  })
  const [currentRating, updateCurrentRating] = useState(0)
  const [errors, updateErrors] = useState({
    text: '',
    rating: undefined
  })

  // * Identify the current user's token, id and avatar
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  // const userName = localStorage.getItem('userName')
  // const userBio = localStorage.getItem('userBio')
  // const userCity = localStorage.getItem('userCity')
  // const userEmail = localStorage.getItem('userEmail')
  const userAvatar = localStorage.getItem('userAvatar')

  // * Fetch location data calling our API
  useEffect(() => {
    axios.get(`/api/locations/${locationId}`)
      .then(resp => {
        updateLocation(resp.data)
      })
  }, [])

  // * Function to delete a location (Only available to the location creator)
  function handleDelete() {
    axios.delete(`/api/locations/${locationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/locations')
      })
  }

  // * Function to display and summit the rated score
  function setRating(rating) {
    const newData = {
      ...formData,
      rating: rating.rating
    }
    updateFormData(newData)
    updateCurrentRating(rating.rating)
  }

  // * Function to catch the change in the comment inputs
  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }
    updateFormData(data)
    updateErrors(newErrors)
    console.log(errors)
  }

  // * Function to summit the changes in the comment inputs
  function handleComment(event) {
    event.preventDefault()
    axios.post(`/api/locations/${locationId}/comments`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          updateFormData({
            text: '',
            rating: null
          })
          updateLocation(resp.data)
        }
      })
  }

  // * Function to delete the comment (only available to the comment creator)
  function handleDeleteComment(commentId) {
    axios.delete(`/api/locations/${locationId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateLocation(resp.data)
      })
  }

  // * Loading progress while completing all the data fetch
  if (!location.category) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-link" max="100">60%</progress>
      </div>
    </div>
  }

  return <div className="container my-3">
    <div className="tile is-ancestor is-align-items-center has-text-start">
      <div className="tile is-parent">
        <article className="tile is-child box is-centered">
          <div className="columns is-mobile">

            {/* Location's name and Bio */}
            <div className="column is-9 pb-0 pt-0 is-mobile">
              <h1 className="title is-1 is-primary is-capitalized mb-0">{location.name}</h1>
              {location.bio && <p className="is-subtitle">{location.bio}</p>}
            </div>

            {/* Edit and Delete buttons (Only available to location creator) */}
            <div className="column is-2 pb-0 is-hidden-mobile">
              {isCreator(location.user) && <div className="dropdown is-hoverable is-right is-mobile">
                <div className="dropdown-trigger">
                  <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Edit Options</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>

                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <Link to={`/locations/edit-location/${locationId}`} className="dropdown-item">🛠 Edit Location</Link>
                    <button onClick={handleDelete} className="dropdown-item">✂️ Delete Location</button>
                  </div>
                </div>
              </div>}
            </div>

            {/* Location's website link if data available */}
            <div className="column is-1 pb-0">
              {location.website && <div className="is-right is-mobile"><a href={location.website} alt="Website" target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faGlobe} color='#056674' size='3x' /></a></div>}
            </div>
          </div>
        </article>
      </div>
    </div>

    {/* Location's image and category tags if data available */}
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-7">
        <div className="tile is-parent">
          <article className="tile is-child box">
            {location.image && <figure className="image is-4by3">
              <img src={location.image} alt={location.name} />
            </figure>}

            <div className="tags my-3">
              {location.category.map((category, index) => {
                return <div className="tag is-warning" key={index}>
                  {category}
                </div>
              })}
            </div>
          </article>
        </div>
      </div>

      {/* Location Address, opening hours and contact details if data available */}
      <div className="tile is-parent is-vertical">
        <article className="tile is-child box">
          <div className="columns">
            <div className="column is-2">
              <FontAwesomeIcon icon={faAddressCard} color='#056674' size='3x' />
            </div>
            <div className="column">
              <p className="title ">Where to find it</p>
              <p className="content mb-0">{location.address}</p>
              <span className="content mb-0">{location.postcode}, </span>
              <span className="content mb-0">{location.city}</span>
            </div>
          </div>
        </article>

        {location.timings && <article className="tile is-child box">
          <div className="columns">
            <div className="column is-2">
              <FontAwesomeIcon icon={faClock} color='#056674' size='3x' />
            </div>
            <div className="column">
              <p className="title ">Opening Hours</p>
              <p className="content is-capitalized mb-0">{location.timings}</p>
            </div>
          </div>
        </article>}

        {location.phone && <article className="tile is-child box">
          <div className="columns">
            <div className="column is-2">
              <FontAwesomeIcon icon={faPhoneAlt} color='#056674' size='3x' />
            </div>
            <div className="column">
              <p className="title ">
                Contact</p>
              {/* <p className="content mb-0">{location.email}</p> */}
              <p className="content mb-0">{location.phone}</p>
            </div>
          </div>
        </article>}
      </div>
    </div >

    {/* Location's coordinates displayed in a Map if the coordinates are available */}
    <div className="tile is-ancestor">
      <div className="tile is-parent ">
        <article className="tile is-child box is-centered">
          <div className="columns">
            <div className="column is-1  is-narrow">
              <div className="is-align-self-center">
                <FontAwesomeIcon icon={faMapMarkedAlt} color='#056674' size='3x' />
              </div>
            </div>

            <div className="column">
              {location.latitude && <div className="columns is-centered m-1 is-mobile"><Map location={location} /></div>}
            </div>
          </div>
        </article>
      </div>
    </div>

    <div className="tile is-ancestor">
      {/* Reviews box */}
      <div className="tile is-parent">
        <article className="tile is-child box">
          <div className="columns">
            <div className="column is-1  is-narrow">
              <div className="is-align-self-center">
                <FontAwesomeIcon icon={faComments} color='#056674' size='3x' />
              </div>
            </div>
            <div className="column">
              <p className="title">Reviews</p>
            </div>
          </div>

          {/* Reviews & Rating given to current site, with user name and avatar  */}
          <div className="content">
            {location.comments && location.comments.map(comment => {
              return <div key={comment._id} className="media">
                <figure className="media-left">
                  <Link to={`/users/${comment.user._id}`} className="subtitle">
                    <strong className="is-capitalized">{comment.user.username}</strong>
                  </Link>
                  <p className="image is-64x64">
                    <img src={comment.user.avatar} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <Rater
                      total={5}
                      rating={comment.rating}
                      interactive={false}
                      className="react-rater"
                    />
                    <p>{comment.text}</p>
                  </div>
                </div>

                {/* Edit and Delete buttons available to review creator only */}
                {isCreator(comment.user._id) && <div className="media-right is-justify-content-center">
                  <Link to={`/locations/edit-comment/${locationId}/${comment._id}`} className="edit mr-1">
                    <FontAwesomeIcon icon={faEdit} color='#CECECE' />
                  </Link>
                  <button className="delete"
                    onClick={() => handleDeleteComment(comment._id)}></button>
                </div>}
              </div>
            })}
          </div>

          {/* POST review box (only available for logged in users that haven't already review this site) */}
          <div className="media"></div>
          {localStorage.getItem('token') && !location.comments.some(comment => {
            return comment.user._id === userId
          }) &&
            <div className="media">
            <figure className="media-left">
                <p className="image is-64x64">
                <img src={userAvatar} />
              </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <form className="control"
                    onSubmit={handleComment}
                  >
                    <Rater
                      total={5}
                      onRate={setRating}
                      className="react-rater"
                    rating={currentRating}
                    />
                    {(currentRating === 0) && <p > {'Please enter a rating'} </p>}
                    {errors.rating && <p style={{ color: 'red' }}>
                      {`There was a problem with your ${errors.rating.path}`}
                    </p>}
                    <textarea
                      className="textarea"
                      value={formData.text}
                      name="text"
                      placeholder="Write your review"
                      onChange={handleChange}
                    >
                      {errors.text && <p style={{ color: 'red' }}>
                        {`There was a problem with your ${errors.text.path}`}
                      </p>}
                  </textarea>
                    <div className="field">
                      <p className="control">
                        <button
                        className="button is-link  my-1"
                      >
                        Submit
                        </button>
                      </p>
                    </div>
                  </form>
              </div>
              </div>
            </div>}
        </article>
      </div>
    </div>
  </div >
}

export default SingleLocation