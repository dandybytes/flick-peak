import React from 'react'
import {NavLink} from 'react-router-dom'

import './Header.scss'

import BurgerMenu from './BurgerMenu'

const Header: React.FunctionComponent = () => {
  return (
    <header className='header'>
      <div className='header-content'>
        <BurgerMenu />

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
      </div>
    </header>
  )
}

export default Header
