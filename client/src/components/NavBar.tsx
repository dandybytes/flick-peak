import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

import './NavBar.scss'

const NavBar: FC = () => (
  <nav className='navbar'>
    <ul className='navbar-list'>
      <li className='navbar-list-item'>
        <NavLink
          to='/'
          exact
          className='navbar-list-item-link'
          activeClassName='navbar-list-item-link-active'
        >
          Home
        </NavLink>
      </li>

      <li className='navbar-list-item'>
        <NavLink
          to='/movies'
          exact
          className='navbar-list-item-link'
          activeClassName='navbar-list-item-link-active'
        >
          Movies
        </NavLink>
      </li>

      <li className='navbar-list-item'>
        <NavLink
          to='/about'
          className='navbar-list-item-link'
          activeClassName='navbar-list-item-link-active'
        >
          About
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default NavBar
