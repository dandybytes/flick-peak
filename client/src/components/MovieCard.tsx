import {FC, memo, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './MovieCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'
import LoadingIndicator from './common/LoadingIndicator'
import FavoriteBubble from './common/FavoriteBubble'
import {RootState, addMovieToFavorites, removeMovieFromFavorites} from '../state'
import {ITMDBMovieData, ITMDBMovieDetails, url_img_poster} from '../services/tmdbapi'

type MovieCardProps = {
  movie: ITMDBMovieData | ITMDBMovieDetails
  orientation?: 'landscape' | 'portrait'
}

const MovieCard: FC<MovieCardProps> = memo(({movie, orientation = 'portrait'}) => {
  const dispatch = useDispatch()

  const {id, title, poster_path, release_date, vote_average} = movie

  const imgURL = poster_path ? url_img_poster + poster_path : ''
  const date = release_date
  const rating = vote_average

  const favoriteMovieData: ITMDBMovieData | ITMDBMovieDetails | null = useSelector(
    (state: RootState) => state.favorites?.[id ?? '']
  )

  const isFavorite = favoriteMovieData != null

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const year = new Date(date).getFullYear()

  const toggleFavorite = (movie: ITMDBMovieData | ITMDBMovieDetails) => {
    isFavorite ? dispatch(removeMovieFromFavorites(movie.id)) : dispatch(addMovieToFavorites(movie))
  }

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

          <div className='favorite'>
            <FavoriteBubble
              isFavorite={isFavorite}
              size='3rem'
              onClick={() => toggleFavorite(movie)}
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
})

export default MovieCard
