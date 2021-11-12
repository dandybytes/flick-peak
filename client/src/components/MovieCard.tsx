import {FC, memo} from 'react'
import {Link} from 'react-router-dom'

import './MovieCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'

type MovieCardProps = {
  id: number
  imgURL: string
  title: string
  date: string
  rating: number
}

const MovieCard: FC<MovieCardProps> = memo(({id, imgURL, title, date, rating}) => {
  const year = new Date(date).getFullYear()

  return (
    <div className='movie-card'>
      <Link to={`/movie/${id}`} className='movie-card-content'>
        {imgURL?.length ? (
          <img
            src={imgURL} // prettier-ignore
            className='movie-card-image'
            loading='lazy'
            alt='movie thumbnail'
          />
        ) : (
          <div className='movie-card-placeholder'>
            <p>{title?.length > 0 ? title : `movie ID ${id}`}</p>
          </div>
        )}

        <div className='movie-content-overlay'>
          <div className='rating'>
            <RadialProgressIndicator
              percentage={rating / 10}
              radius={20}
              backgroundColor={'rgb(25, 25, 25)'}
              textColor='white'
              strokeWidth={3}
              strokeColor={'rgb(0, 255, 67)'}
              trackColor={'transparent'}
            />
          </div>

          <p className='title'>{title}</p>
          <p className='date'>{year}</p>
        </div>
      </Link>
    </div>
  )
})

export default MovieCard
