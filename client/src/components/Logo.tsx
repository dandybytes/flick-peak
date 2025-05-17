import {FunctionComponent} from 'react'
import {Link} from 'react-router-dom'

import './Logo.scss'

import FilmStrip from './FilmStrip'

const Logo: FunctionComponent = () => {
  return (
    <Link className='logo' to='/'>
      <FilmStrip />
    </Link>
  )
}

export default Logo
