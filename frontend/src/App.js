import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Create from './components/CreateAdvert'
import Navbar from './components/Navbar'
import Adverts from './components/Adverts'
import SingleAdvert from './components/SingleAdvert'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Basket from './components/Basket'
import EditAdvert from './components/EditAdvert'



const App = () => {

  const [basketItems, setBasketItems] = useState([])
  const [editAdvert,setEditAdvert] = useState([])
  return (
    <BrowserRouter>
      <Navbar basketItems={basketItems}/>
      <Switch>
        <Route exact path='/create' component={Create}/>
        <Route exact path='/' component={Adverts} />
        <Route exact path='/adverts/:id'><SingleAdvert setBasketItems={setBasketItems} basketItems={basketItems}/></Route>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile'> <Profile setEditAdvert={setEditAdvert}/> </Route>
        <Route exact path='/basket'><Basket basketItems={basketItems} setBasketItems={setBasketItems} /></Route>
        <Route exact path='/edit'> <EditAdvert editAdvert={editAdvert}/></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
