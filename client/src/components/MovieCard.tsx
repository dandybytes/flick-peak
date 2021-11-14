import {FC, memo, useState} from 'react'
import {Link} from 'react-router-dom'

import './MovieCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'
import LoadingIndicator from './common/LoadingIndicator'

type MovieCardProps = {
  id: number
  imgURL: string
  title: string
  date: string
  rating: number
  orientation?: 'landscape' | 'portrait'
}

const MovieCard: FC<MovieCardProps> = memo(
  ({id, imgURL, title, date, rating, orientation = 'portrait'}) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const year = new Date(date).getFullYear()

    return (
      <div className={`movie-card ${orientation}`}>
        <div className='movie-card-content'>
          {imgURL?.length ? (
            <>
              <img
                src={imgURL}
                className={`movie-card-image ${isImageLoaded ? ' loaded' : ''}`}
                loading='lazy'
                alt={`${title} movie poster`}
                onLoad={() => setIsImageLoaded(true)}
              />
              <div className={`movie-image-load-indicator ${isImageLoaded ? ' hidden' : ''}`}>
                <LoadingIndicator />
              </div>
            </>
          ) : (
            <div className='movie-card-placeholder'>
              <p>{title?.length > 0 ? title : `movie ID ${id}`}</p>
            </div>
          )}

          <div className='movie-content-overlay'>
            <div className='rating'>
              <RadialProgressIndicator
                percentage={rating / 10}
                radius={orientation === 'portrait' ? 20 : 14}
                strokeWidth={orientation === 'portrait' ? 3 : 2}
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
)

export default MovieCard
