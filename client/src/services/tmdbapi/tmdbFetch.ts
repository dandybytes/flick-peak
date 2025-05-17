import {
  url_popular,
  url_now_playing,
  url_top_rated,
  url_query,
  url_details_start,
  url_details_end,
  url_recommendations_beginning,
  url_recommendations_middle
} from './tmdbUrl'

import {
  ITMDBMovieDetails,
  ITMDBMovieListResponse,
  ITMDBNowPlayingMovieResponse,
  ITMDBMovieRecommendationsResponse
} from './tmdbTypes'

export const fetchPopularMovies = (pageNum = 1): Promise<ITMDBMovieListResponse> =>
  fetch(`${url_popular}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error =>
      console.error(`ERROR: fetching page ${pageNum} of popular movies failed: `, error)
    )

export const fetchNowPlayingMovies = (pageNum = 1): Promise<ITMDBNowPlayingMovieResponse> =>
  fetch(`${url_now_playing}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error =>
      console.error(`ERROR: fetching page ${pageNum} of now playing movies failed: `, error)
    )

export const fetchTopRatedMovies = (pageNum = 1): Promise<ITMDBMovieListResponse> =>
  fetch(`${url_top_rated}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error =>
      console.error(`ERROR: fetching page ${pageNum} of top rated movies failed: `, error)
    )

export const fetchMoviesByKeyword = (
  keyword: string,
  pageNum = 1
): Promise<ITMDBMovieListResponse> =>
  fetch(`${url_query}&query=${keyword}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error => console.error('ERROR: fetching movie data by ID failed: ', error))

export const fetchMovieDetails = (movieId: number): Promise<ITMDBMovieDetails> =>
  fetch(`${url_details_start}${movieId}${url_details_end}`)
    .then(response => response.json())
    .catch(error => console.error(`ERROR: fetching details for movie ${movieId} failed: `, error))

export const fetchMovieRecommendations = (
  movieId: number,
  pageNum: number
): Promise<ITMDBMovieRecommendationsResponse> =>
  fetch(
    url_recommendations_beginning + String(movieId) + url_recommendations_middle + String(pageNum)
  )
    .then(response => response.json())
    .catch(error =>
      console.error(`ERROR: fetching recommendations for movie ${movieId} failed: `, error)
    )
