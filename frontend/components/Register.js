import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    bio: '',
    city: '',
    avatar: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    bio: '',
    city: '',
    avatar: '',
    password: '',
    passwordConfirmation: ''
  })

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
  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/signup', formData)
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
          console.log(errors)
        } else {
          props.history.push('/login')
        }
      })

  }
  return <div className="container is-fluid mt-5">
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.username}
            name="username"
            className="input"
          />
          {errors.username && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your Username'}
          </p>}
        </div>
        <p className="help">Please choose a unique username</p>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
            className="input"
          />
          {errors.email && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your Email'}
          </p>}
        </div>
        <p className="help">e.g. example@example.com</p>
      </div>
      <div className="field">
        <label className="label">Bio</label>
        <div className="control">
          <textarea
            placeholder="Describe yourself.."
            type="text"
            onChange={handleChange}
            value={formData.bio}
            name="bio"
            className="textarea"
          />
        </div>
        <p className="help">Tell us a bit about yourself</p>
      </div>
      <div className="field">
        <label className="label">City</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.city}
            name="city"
            className="input"
          />
          {errors.email && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your City'}
          </p>}
        </div>
        <p className="help">Let us know which city you are based in</p>
      </div>
      <div className="field">
        <label className="label">Avatar</label>
        <div className="control">
          <input
            type="text"
            onChange={handleChange}
            value={formData.avatar}
            name="avatar"
            className="input"
          />
        </div>
        <p className="help">Insert a link to your profile image</p>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            className="input"
          />
          {errors.password && <p className="help" style={{ color: 'red' }}>
            {'There was a problem with your Password'}
          </p>}
        </div>
        <p className="help">Create a password</p>
      </div>
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
            className="input"
          />
          {errors.passwordConfirmation && <p className="help" style={{ color: 'red' }}>
            {'Does not match password'}
          </p>}
        </div>
        <p className="help">Please make sure your passwords match</p>
      </div>
      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button className="button is-primary">
            Sign Up
          </button>
        </p>
      </div>
    </form>
  </div>

}

export default Register