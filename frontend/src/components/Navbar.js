import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Menu, MenuItem, Icon } from 'semantic-ui-react'
import { userIsAuthenticated } from '../helpers/authentication'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  }, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')// remove token from local storage
    history.push('/')
  }

  return (
    <Menu inverted >
      <MenuItem position='left' >
        <Link to='/'><Icon name='home' size='big' /></Link>
      </MenuItem>

      {userIsAuthenticated() ? <>
        <MenuItem>
          <Link to='/basket'><Icon name='shopping basket' size='big' /></Link>
        </MenuItem>
        <MenuItem>
          <Link to='/profile'><Icon name='user' size='big' /></Link>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
        >Logout</MenuItem></> : <><MenuItem
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