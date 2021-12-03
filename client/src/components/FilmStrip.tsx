import cinemaIcon from '../assets/img/cinema.png'

import './FilmStrip.scss'

const FilmStrip = ({willGlowOnHover = true}: {willGlowOnHover?: boolean}) => (
  <div className={`filmstrip ${willGlowOnHover ? 'hover-glow' : ''}`}>
    <div className='filmstrip-container'>
      <div className='filmstrip-perforations' />

      <div className='filmstrip-content'>
        <div className='filmstrip-frame'>
          <img src={cinemaIcon} alt='cinema logo' />
        </div>
        <div className='filmstrip-frame'></div>
        <div className='filmstrip-frame'>Flick</div>
        <div className='filmstrip-frame'></div>
        <div className='filmstrip-frame'>Pick</div>
        <div className='filmstrip-frame'></div>
        <div className='filmstrip-frame'>
          <img src={cinemaIcon} alt='cinema logo' />
        </div>
        <div className='filmstrip-frame'></div>
        <div className='filmstrip-frame'>Flick</div>
        <div className='filmstrip-frame'></div>
        <div className='filmstrip-frame'>Pick</div>
        <div className='filmstrip-frame'></div>
      </div>

      <div className='filmstrip-perforations' />
    </div>
  </div>
)

export default FilmStrip
