import React from 'react'

import './Header.scss'

import Logo from './Logo'
import NavBar from './NavBar'

const Header: React.FunctionComponent = () => {
  return (
    <header className='header'>
      <Logo />

      <NavBar />
      <div className='user-profile' style={{minWidth: '4rem'}}></div>
    </header>
  )
}

export default Header
