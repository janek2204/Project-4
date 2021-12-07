import React, { useState } from 'react'
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

  const [basketItems, setBasketItems] = useState([])
  const [editAdvert,setEditAdvert] = useState([])
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'> <Home/></Route>
        <Route exact path='/adverts' component={Adverts} />
        <Route exact path='/adverts/:id'><SingleAdvert setBasketItems={setBasketItems} basketItems={basketItems}/></Route>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile'> <Profile setEditAdvert={setEditAdvert}/> </Route>
        <Route exact path='/basket'><Basket basketItems={basketItems} /></Route>
        <Route exact path='/edit'> <AddEditDelete editAdvert={editAdvert}/></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
