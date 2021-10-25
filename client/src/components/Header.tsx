import React from 'react'

import './Header.scss'

import Logo from './Logo'
import NavBar from './NavBar'
import BurgerMenu from './BurgerMenu'

const Header: React.FunctionComponent = () => {
  return (
    <header className='header'>
      <Logo />
      <NavBar />
      <BurgerMenu />
      <div className='user-profile' style={{minWidth: '4rem'}}></div>
    </header>
  )
}

export default Header
