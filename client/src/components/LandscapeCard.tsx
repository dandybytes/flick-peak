import {FC} from 'react'
import {Link} from 'react-router-dom'

import './LandscapeCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'

type LandscapeCardProps = {
  id: number
  imgURL: string
  title: string
  date: string
  rating: number
}

const LandscapeCard: FC<LandscapeCardProps> = ({id, imgURL, title, date, rating}) => {
  const year = new Date(date).getFullYear()

  return (
    <div className='movie-card-landscape'>
      <div
        className='movie-card-content'
        style={imgURL ? {backgroundImage: `url(${imgURL})`} : undefined}
      >
        {!imgURL?.length && (
          <div className='movie-card-placeholder'>
            <p>{title?.length > 0 ? title : `movie ID ${id}`}</p>
          </div>
        )}

        <div className='movie-content-overlay'>
          <div className='rating'>
            <RadialProgressIndicator
              percentage={rating / 10}
              radius={16}
              backgroundColor={'rgb(25, 25, 25)'}
              textColor='white'
              strokeWidth={3}
              strokeColor={'rgb(0, 255, 67)'}
              trackColor={'transparent'}
            />
          </div>

          <p className='title'>{title}</p>
          <p className='date'>{year}</p>

          <Link to={`/movie/${id}`} className='movie-card-button'>
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandscapeCard
