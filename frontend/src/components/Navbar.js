import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, Icon } from 'semantic-ui-react'


const Navbar = () => {

  return (
    <Menu>
      <MenuItem>
        <Link to='/'><Icon name='home' size='big' /></Link>
      </MenuItem>
    </Menu>
  )
}

export default Navbar