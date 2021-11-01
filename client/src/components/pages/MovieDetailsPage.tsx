import React, {FC, useEffect} from 'react'
import {Redirect, useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {AiOutlineClockCircle} from 'react-icons/ai'
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import {GoCalendar} from 'react-icons/go'

import './MovieDetailsPage.scss'

import {RootState, fetchMovieById, fetchRecommendationsByMovieId} from '../../state/'
import {
  ITMDBMovieDetails,
  ITMDBRecommendationMovieData,
  movieCategoryList,
  url_img_backdrop,
  url_img_poster
} from '../../services/tmdbapi'
import {formattedCurrency} from '../../utils'

import LoadingIndicator from '../common/LoadingIndicator'
import RadialProgressIndicator from '../common/RadialProgressIndicator'
import FavoriteBubble from '../common/FavoriteBubble'

type PageParams = {
  movieID?: string
}

const MovieDetailsPage: FC = () => {
  const {movieID} = useParams<PageParams>()
  const location = useLocation()
  const dispatch = useDispatch()

  const movieDetailsAreFetching: boolean = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.fetching
  )
  const movieDetailError: string = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.error
  )
  const movieDetailData: ITMDBMovieDetails | null = useSelector(
    (state: RootState) => state.movies?.[movieID ?? '']?.details
  )

  const recommendationsAreFetching: boolean = useSelector(
    (state: RootState) => state.recommendations?.[movieID ?? '']?.fetching
  )
  // const recommendationError: string = useSelector(
  //   (state: RootState) => state.recommendations?.[movieID ?? '']?.error
  // )
  const recommendationData: ITMDBRecommendationMovieData[] | null = useSelector(
    (state: RootState) => state.recommendations?.[movieID ?? '']?.recommendations
  )

  const errorMessageToDisplay =
    typeof movieDetailError === 'string' ? movieDetailError : JSON.stringify(movieDetailError)

  useEffect(() => {
    if (movieID && movieDetailData == null && !movieDetailsAreFetching) {
      dispatch(fetchMovieById(Number(movieID)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (movieID && recommendationData == null && !recommendationsAreFetching) {
      dispatch(fetchRecommendationsByMovieId(Number(movieID)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let tagline = (movieDetailData?.tagline ?? '').toLowerCase()
  // get rid of the trailing period
  tagline = tagline[tagline.length - 1] === '.' ? tagline.slice(0, tagline.length - 1) : tagline

  const rating = movieDetailData?.vote_average ?? 0

  const runtime = movieDetailData?.runtime
    ? `${Math.floor(movieDetailData?.runtime / 60)}h ${movieDetailData?.runtime % 60}min`
    : null

  const budget = movieDetailData?.budget ? formattedCurrency(movieDetailData.budget) : null

  if (!movieID) return <Redirect to={`${location.pathname}#${movieCategoryList[0]}`} />

  return (
    <div className='movie-details-page'>
      <div
        className='movie-details-background'
        style={
          movieDetailData?.backdrop_path
            ? {
                backgroundImage: `url("${url_img_backdrop}${movieDetailData?.backdrop_path}")`
              }
            : {}
        }
      />

      <div className='movie-details-container'>
        {movieDetailsAreFetching ? (
          <LoadingIndicator />
        ) : errorMessageToDisplay?.length ? (
          <div className='error-message-box'>{errorMessageToDisplay}</div>
        ) : !movieDetailData?.id && !!movieDetailData?.original_title ? (
          <div className='error-message-box'>No data available for this movie</div>
        ) : (
          <>
            <div className='movie-details-poster'>
              {movieDetailData?.poster_path && (
                <img src={`${url_img_poster}${movieDetailData?.poster_path}`} alt='movie poster' />
              )}
            </div>

            <div className='movie-details-description'>
              <div className='movie-details-heading'>
                <div className='heading-left'>
                  <h1 className='movie-details-title'>{movieDetailData?.title}</h1>

                  {tagline ? <h3 className='movie-details-tagline'>{tagline}</h3> : null}

                  {(movieDetailData?.genres?.length ?? 0) > 0 && (
                    <div className='movie-details-genres'>
                      {movieDetailData?.genres.map((genre, index) => (
                        <span className='movie-genre' key={`genre-${index}-${genre.name}`}>
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className='heading-right'>
                  <FavoriteBubble isFavorite={false} size='4rem' />
                </div>
              </div>

              {movieDetailData?.overview && (
                <p className='movie-details-plot'>{movieDetailData?.overview}</p>
              )}

              <ul className='movie-stat-list'>
                {rating && (
                  <li className='movie-release movie-stat-item'>
                    <RadialProgressIndicator
                      percentage={rating / 10}
                      radius={25}
                      textColor={'rgba(255, 255, 255, 0.8)'}
                      strokeWidth={3}
                      strokeColor={'rgba(255, 255, 255, 0.8)'}
                      trackColor={'transparent'}
                    />
                  </li>
                )}

                {runtime && (
                  <li className='movie-runtime movie-stat-item'>
                    <AiOutlineClockCircle className='stat-icon' />
                    <p>{runtime}</p>
                  </li>
                )}

                {movieDetailData?.release_date && (
                  <li className='movie-release movie-stat-item'>
                    <GoCalendar className='stat-icon' />
                    <p>{movieDetailData?.release_date}</p>
                  </li>
                )}

                {budget && (
                  <li className='movie-budget movie-stat-item'>
                    <FaRegMoneyBillAlt className='stat-icon' />
                    <p>{budget}</p>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieDetailsPage
