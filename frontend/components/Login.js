import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errorMessage, updateErrorMessage] = useState('')

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
      .then(resp => {

        localStorage.setItem('token', resp.data.token)
        props.history.push('/locations')
      })
      .catch(error => {
        updateErrorMessage(error.response.statusText)
      })
  }

  return <div className="container is-fluid mt-5">
    <form onSubmit={handleSubmit}>
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
        </div>
        <p className="help">e.g. example@example.com</p>
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
        </div>
        <p className="help">Please enter your password</p>
        {errorMessage !== '' && <p className="help" style={{ color: 'red' }}>
          {'Unable to log in, please check your username and password are correct'}
        </p>}
      </div>
      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button className="button is-primary">
            Log In
          </button>
        </p>
      </div>
    </form>
  </div>

}

export default Login