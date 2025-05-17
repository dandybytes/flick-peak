import React from 'react'

import './Footer.scss'

import movieDBlogo from '../assets/img/moviedb-logo.png'

const Footer: React.FunctionComponent = () => {
  return (
    <footer className='footer'>
      <div className='footer-credits'>
        <a
          href='https://www.themoviedb.org/about/logos-attribution'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img className='moviedb-logo' src={movieDBlogo} alt='powered by the MovieDB API' />
        </a>
      </div>

      <div className='footer-note'>
        <q>Television is chewing gum for the eyes.</q>
      </div>
    </footer>
  )
}

export default Footer
