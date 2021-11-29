import {FC, memo, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './MovieCard.scss'

import RadialProgressIndicator from './common/RadialProgressIndicator'
import LoadingIndicator from './common/LoadingIndicator'
import ErrorMessageBox from './common/ErrorMessageBox'
import FavoriteBubble from './common/FavoriteBubble'
import {
  RootState,
  addMovieToFavorites,
  removeMovieFromFavorites,
  fetchMovieById,
  createNotification
} from '../state'
import {ITMDBMovieDetails, url_img_poster} from '../services/tmdbapi'

type MovieCardProps = {
  movieID: string
  orientation?: 'landscape' | 'portrait'
}

const MovieCard: FC<MovieCardProps> = memo(({movieID, orientation = 'portrait'}) => {
  const dispatch = useDispatch()

  const token = useSelector((state: RootState) => state?.user?.data?.token)
  const movieDetailsAreFetching: boolean = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.fetching
  )
  const movieDetailError: string = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.error
  )
  const movieDetailData: ITMDBMovieDetails | null = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.details
  )

  const idsFavoriteMovies: string[] | null = useSelector(
    (state: RootState) => state.favorites?.data
  )

  const movieDetailErrorMessage =
    typeof movieDetailError === 'string' ? movieDetailError : JSON.stringify(movieDetailError)

  useEffect(() => {
    if (movieID && movieDetailData == null && !movieDetailsAreFetching) {
      dispatch(fetchMovieById(Number(movieID)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieID, movieDetailData])

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const title = movieDetailData?.title ?? ''
  const date = movieDetailData?.release_date
  const year = date != null ? new Date(date).getFullYear() : null
  const imgURL = movieDetailData?.poster_path ? url_img_poster + movieDetailData.poster_path : ''
  const rating = movieDetailData?.vote_average ?? 0
  const isFavorite = (idsFavoriteMovies ?? []).includes(movieID)

  const toggleFavorite = (movieID: string) => {
    if (!token) {
      dispatch(
        createNotification(
          'To be able to save favorite movies, please log in!', //message
          'info', // notification type
          5000 // duration (setting to 0 will make it never expire)
        )
      )
      return
    }
    isFavorite
      ? dispatch(removeMovieFromFavorites(movieID, token))
      : dispatch(addMovieToFavorites(movieID, token))
  }

  const movieCardContent = (
    <>
      {imgURL?.length ? (
        <>
          <img
            src={imgURL}
            className={`movie-card-image ${isImageLoaded ? ' loaded' : ''}`}
            loading='lazy'
            alt={`${title} movie poster`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className={`movie-load-indicator ${isImageLoaded ? ' hidden' : ''}`}>
            <LoadingIndicator />
          </div>
        </>
      ) : (
        <div className='movie-card-placeholder'>
          <p>{title?.length > 0 ? title : `movie ID ${movieID}`}</p>
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
            onClick={() => toggleFavorite(movieID)}
          />
        </div>

        <p className='title'>{title}</p>
        <p className='date'>{year}</p>

        <Link to={`/movie/${movieID}`} className='movie-card-button'>
          Details
        </Link>
      </div>
    </>
  )

  return (
    <div className={`movie-card ${orientation}`}>
      <div className='movie-card-content'>
        {movieDetailsAreFetching ? (
          <LoadingIndicator />
        ) : movieDetailErrorMessage ? (
          <ErrorMessageBox message={movieDetailErrorMessage} />
        ) : (
          movieCardContent
        )}
      </div>
    </div>
  )
})

export default MovieCard
