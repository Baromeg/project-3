const path = require('path')
const dist = path.join(__dirname, 'dist')
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'

import Home from './components/Home'
import SingleLocation from './components/SingleLocation'
import Locations from './components/Locations'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import AddLocation from './components/AddLocation'
import EditLocation from './components/EditLocation'
import EditComment from './components/EditComment'
import MapPage from './components/MapPage'
import User from './components/User'

import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/locations' component={Locations} />
      <Route exact path='/Map' component={MapPage} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/locations/new-location' component={AddLocation} />
      <Route exact path='/users/:userId' component={User} />
      <Route
        exact
        path='/locations/edit-location/:locationId'
        component={EditLocation}
      />
      <Route exact path='/locations/:locationId' component={SingleLocation} />
      <Route
        exact
        path='/locations/edit-comment/:locationId/:commentId'
        component={EditComment}
      />
    </Switch>
  </BrowserRouter>

  // return <button className="button is-primary" >Hello friends</button>
)

export default App
