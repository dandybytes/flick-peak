import React, {FC} from 'react'
import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'

import './MovieHero.scss'

import {ITMDBMovieData, url_img_backdrop, url_img_poster} from '../services/tmdbapi'
import {getFullYear, getMonthName} from '../utils/time'

import LoadingIndicator from './common/LoadingIndicator'

type MovieHeroProps = {
  movieList: ITMDBMovieData[]
}

const MovieHero: FC<MovieHeroProps> = ({movieList}): JSX.Element => {
  // filter out movies without images
  const validMovies = (movieList ?? []).filter(movie => movie.poster_path && movie.backdrop_path)

  return (
    <div className='movie-hero'>
      {!movieList?.length ? (
        <LoadingIndicator />
      ) : (
        <Slider autoplay={3500} previousButton='' nextButton=''>
          {validMovies.map(movie => {
            const {backdrop_path, id, poster_path, release_date, title} = movie
            const imageUrl =
              window.innerWidth > 600
                ? `${url_img_backdrop}${backdrop_path}`
                : `${url_img_poster}${poster_path}`
            const dateObject = new Date(release_date)
            const date = getMonthName(dateObject) + ' ' + getFullYear(dateObject)

            return (
              <div key={id}>
                <img src={imageUrl} alt={title} className='slide-background-image' />

                <div className='slide-overlay' />

                <div className='slide-content'>
                  <h2 className='movie-title'>{title}</h2>
                  <div className='movie-details'>
                    <span className='release-date'>{date}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      )}
    </div>
  )
}

export default MovieHero
