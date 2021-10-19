import React from 'react'

import cinemaIcon from '../assets/img/cinema.png'

import './FilmStrip.scss'

const FilmStrip = () => {
  return (
    <div className='filmstrip'>
      <div className='filmstrip-container'>
        <div className='filmstrip-perforations' />
        <div className='filmstrip-content'>
          <div className='filmstrip-frame'>
            <img src={cinemaIcon} alt='cinema logo' />
          </div>
          <div className='filmstrip-frame blank-frame'></div>
          <div className='filmstrip-frame'>Flick</div>
          <div className='filmstrip-frame blank-frame'></div>
          <div className='filmstrip-frame'>Peek</div>
          <div className='filmstrip-frame blank-frame'></div>
          <div className='filmstrip-frame'>
            <img src={cinemaIcon} alt='cinema logo' />
          </div>
          <div className='filmstrip-frame blank-frame'></div>
          <div className='filmstrip-frame'>Flick</div>
          <div className='filmstrip-frame blank-frame'></div>
          <div className='filmstrip-frame'>Peek</div>
          <div className='filmstrip-frame blank-frame'></div>
        </div>
        <div className='filmstrip-perforations' />
      </div>
    </div>
  )
}

export default FilmStrip
