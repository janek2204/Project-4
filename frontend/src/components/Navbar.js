import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Menu, MenuItem, Icon } from 'semantic-ui-react'
import { userIsAuthenticated } from '../helpers/authentication'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  },[location.pathname])
  
  const handleLogout = () => {
    window.localStorage.removeItem('token')// remove token from local storage
    history.push('/')
  }

  return (
    <Menu>
      <MenuItem position='left'>
        <Link to='/'><Icon name='home' size='big' /></Link>
      </MenuItem>

      {userIsAuthenticated() ? <MenuItem
        onClick={handleLogout}
      >Logout</MenuItem> : <><MenuItem
        onClick={() => history.push('/login')}
      >Login</MenuItem>
      <MenuItem
        onClick={() => history.push('/register')}
      >Register</MenuItem></>
      }

    </Menu>
  )
}

export default Navbar