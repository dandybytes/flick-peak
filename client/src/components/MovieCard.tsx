import React, {FC} from 'react'
import {Link} from 'react-router-dom'

// import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

import './MovieCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'

type MovieCardProps = {
  id: number
  imgURL: string
  title: string
  date: string
  rating: number
}

const MovieCard: FC<MovieCardProps> = ({id, imgURL, title, date, rating}) => {
  const year = new Date(date).getFullYear()

  return (
    <div className='movie-card'>
      <Link
        to={`/movie/${id}`}
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
              radius={20}
              strokeWidth={3}
              strokeColor={'rgb(0, 255, 67)'}
              trackColor={'transparent'}
              text={String(rating)}
            />
          </div>

          <p className='title'>{title}</p>
          <p className='date'>{year}</p>

          {/* <div className='favorite' data-for='heart' data-tip='hello world'>
            <AiOutlineHeart style={{width: '2rem', height: '2rem'}} />
          </div> */}
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
