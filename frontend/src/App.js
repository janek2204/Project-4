import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Adverts from './components/Adverts'
import SingleAdvert from './components/SingleAdvert'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Basket from './components/Basket'
import AddEditDelete from './components/AddDeleteEdit'



const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/adverts' component={Adverts} />
        <Route exact path='/adverts/:id' component={SingleAdvert} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/basket' component={Basket} />
        <Route exact path='/edit' component={AddEditDelete} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
