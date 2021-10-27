import React, {FC} from 'react'
import {Link} from 'react-router-dom'

import './MovieCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'

type MovieCardProps = {
  id: number
  img: string
  title: string
  date: string
  rating: number
}

const MovieCard: FC<MovieCardProps> = ({id, img, title, date, rating}) => {
  const year = new Date(date).getFullYear()

  return (
    <Link to={`/movie/${id}`} className='movie-card'>
      {img?.length > 0 ? (
        <img className='movie-card-img' src={img} alt={`${title} movie thumbnail`} />
      ) : (
        <div className='movie-card-placeholder'>
          <p>{title?.length > 0 ? title : `movie ID ${id}`}</p>
        </div>
      )}

      <div className='movie-content-overlay'>
        <p className='title'>{title}</p>
        <p className='date'>{year}</p>

        <div className='rating'>
          <RadialProgressIndicator
            percentage={rating / 10}
            radius={20}
            strokeWidth={3}
            strokeColor={'rgb(0, 255, 67)'}
            trackColor={'transparent'}
            text={String(rating)}
          />
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
