import React, {useState} from 'react'

import './Header.scss'

import Logo from './Logo'
import NavBar from './NavBar'
import BurgerMenu from './BurgerMenu'
import SearchBar from './common/SearchBar'

const Header: React.FunctionComponent = () => {
  const [query, setQuery] = useState<string>('')

  return (
    <header className='header'>
      <Logo />
      <NavBar />
      <SearchBar query={query} setQuery={setQuery} />
      <BurgerMenu />
      <div className='user-profile' style={{minWidth: '4rem'}}></div>
    </header>
  )
}

export default Header
