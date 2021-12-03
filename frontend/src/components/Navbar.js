import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, MenuItem, Icon, Button } from 'semantic-ui-react'


const Navbar = () => {
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('token')// remove token from local storage
    history.push('/')
  }

  return (
    <Menu>
      <MenuItem>
        <Link to='/'><Icon name='home' size='big' /></Link>
      </MenuItem>
      <MenuItem position='right'>
        <Button position='right' onClick={() => history.push('/login')}>Login</Button>
        <Button position='right' onClick={() => history.push('/register')}>Register</Button>
        <Button position='right' onClick={handleLogout}>Logout</Button>
      </MenuItem>
    </Menu>
  )
}

export default Navbar