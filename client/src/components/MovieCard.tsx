import React, {FC} from 'react'
import {Link} from 'react-router-dom'

import './MovieCard.scss'

type MovieCardProps = {
  id: number
  img: string
  title: string
}

const MovieCard: FC<MovieCardProps> = ({id, img, title}) => (
  <Link to={`/movie/${id}`} className='movie-card'>
    {img?.length > 0 ? (
      <img className='movie-card-img' src={img} alt={`${title} movie thumbnail`} />
    ) : (
      <div className='movie-card-placeholder'>
        <p>{title?.length > 0 ? title : `movie ID ${id}`}</p>
      </div>
    )}
  </Link>
)

export default MovieCard
