import React from 'react'
import {Link} from 'react-router-dom'

import './Logo.scss'

import FilmStrip from './FilmStrip'

const Logo: React.FunctionComponent = () => {
  return (
    <div className='logo'>
      <Link className='logo-link' to='/movies'>
        <FilmStrip />
      </Link>
    </div>
  )
}

export default Logo
