import React, {FC, useEffect} from 'react'
import {Redirect, useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './MovieDetailsPage.scss'

import {RootState, fetchMovieById} from '../../state/'
import {
  ITMDBMovieDetails,
  movieCategoryList,
  url_img_backdrop,
  url_img_poster
} from '../../services/tmdbapi'

import LoadingIndicator from '../common/LoadingIndicator'

type PageParams = {
  movieID?: string
}

const MovieDetailsPage: FC = () => {
  const {movieID} = useParams<PageParams>()
  const location = useLocation()
  const dispatch = useDispatch()

  const fetching: boolean = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.fetching
  )
  const error: string = useSelector((state: RootState) => state.movies?.[movieID ?? '']?.error)
  const movieDetails: ITMDBMovieDetails | null = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.details
  )

  const errorMessageToDisplay = typeof error === 'string' ? error : JSON.stringify(error)

  useEffect(() => {
    if (movieID && movieDetails == null && !fetching) dispatch(fetchMovieById(Number(movieID)))
  }, [movieID, fetching])

  let tagline = (movieDetails?.tagline ?? '').toLowerCase()
  // get rid of the trailing period
  tagline = tagline[tagline.length - 1] === '.' ? tagline.slice(0, tagline.length - 1) : tagline

  const containerStyle =
    movieDetails && window.innerWidth > 500
      ? {
          backgroundImage: movieDetails?.backdrop_path
            ? `url("${url_img_backdrop}${movieDetails?.backdrop_path}")`
            : 'var(--color-1)'
        }
      : {}

  const runtime = movieDetails?.runtime
    ? `${Math.floor(movieDetails?.runtime / 60)}h ${movieDetails?.runtime % 60}min`
    : 'unknown'

  // budget (number -> comma-separated string preceded by $ sign)
  let budget: string | string[] = []
  if ((movieDetails?.budget ?? 0) > 0) {
    budget[0] = (movieDetails?.budget ?? 0).toString() ?? ''
    while (budget[0].length > 3) {
      budget.push(budget[0].slice(budget[0].length - 3))
      budget[0] = budget[0].slice(0, budget[0].length - 3)
    }
    budget = '$' + budget.join(',')
  } else {
    budget = 'no info'
  }

  if (!movieID) return <Redirect to={`${location.pathname}#${movieCategoryList[0]}`} />

  if (errorMessageToDisplay?.length) {
    return (
      <div className='movie-details-page'>
        <div className='error-message-box'>{errorMessageToDisplay}</div>
      </div>
    )
  }

  if (fetching) {
    return (
      <div className='movie-details-page'>
        <LoadingIndicator />
      </div>
    )
  }

  if (!movieDetails?.id && !!movieDetails?.original_title) {
    return (
      <div className='movie-details-page'>
        <div className='error-message-box'>No data available for this movie</div>
      </div>
    )
  }

  return (
    <div className='movie-details-page'>
      <div className='movie-details-container' style={containerStyle}>
        <div className='movie-details-content'>
          <div className='movie-details-poster'>
            {movieDetails?.poster_path && (
              <img src={`${url_img_poster}${movieDetails?.poster_path}`} alt='movie poster' />
            )}
          </div>
          <div className='movie-details-text'>
            <div className='movie-details-heading'>
              <h1 className='movie-details-title'>{movieDetails?.title}</h1>
              <h3 className='movie-details-tagline'>
                — <span>{tagline ? tagline : '—'}</span> —
              </h3>
            </div>
            <p className='movie-details-genre'>
              {movieDetails?.genres.map(obj => obj.name).join(', ')}
            </p>
            <p className='movie-details-description'>{movieDetails?.overview}</p>
            <p className='movie-details-date'>Release date: {movieDetails?.release_date}</p>
            <p className='movie-details-rating'>
              Rating:{' '}
              <span className='movie-details-rating-number'>{movieDetails?.vote_average}</span>{' '}
              <i className='fas fa-star movie-details-rating-icon' />
            </p>
            <ul className='movie-details-stat-stripe'>
              <li className='movie-details-stat-stripe-item'>
                <i className='far fa-clock' />
                <span>runtime: </span>
                <span>{runtime}</span>
              </li>

              <li className='movie-details-stat-stripe-item'>
                <i className='far fa-money-bill-alt' />
                <span>budget: </span>
                <span>{budget}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
