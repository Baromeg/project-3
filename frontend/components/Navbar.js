import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../styles/favicon1.png'
const NavBar = (props) => {
  const [isActive, setisActive] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')
  const userBio = localStorage.getItem('userBio')
  const userCity = localStorage.getItem('userCity')
  const userEmail = localStorage.getItem('userEmail')
  const userAvatar = localStorage.getItem('userAvatar')

  return (
    <nav className='navbar is-fixed-top ' id='navbar'>
      <div className='navbar-brand'>
        <a className='navbar-item' href='/'>
          <img src={logo} alt='GreenWorld' height='28' />
        </a>
        <a
          role='button'
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbar-menu'
          onClick={() => setisActive(!isActive)}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        id='navbar-menu'
      >
        <div className='navbar-start'>
          {/* <Link to="/" className="navbar-item">
          <strong>Home</strong>
        </Link> */}
          <Link to='/locations' className='navbar-item'>
            Locations
          </Link>
          <Link to='/map' className='navbar-item'>
            Map
          </Link>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            {!localStorage.getItem('token') && (
              <Link className='button is-light' to='/register'>
                Register
              </Link>
            )}
            {!localStorage.getItem('token') && (
              <Link to='/login' className='button is-link'>
                Login
              </Link>
            )}
            {localStorage.getItem('token') && (
              <p>
                Welcome back{' '}
                <Link className='is-capitalized' to={`/users/${userId}`}>
                  <strong className='is-link'>{userName}</strong>
                </Link>
              </p>
            )}
            {localStorage.getItem('token') && (
              <Link to='/locations/new-location' className='button is-link'>
                Add Location
              </Link>
            )}
            {localStorage.getItem('token') && (
              <button className='button' onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
