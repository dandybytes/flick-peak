import {
  url_popular,
  url_now_playing,
  url_top_rated,
  url_query,
  url_details_start,
  url_details_end
} from './tmdbUrl'

import {ITMDBMovieDetails, ITMDBMovieListResponse, ITMDBNowPlayingMovieResponse} from './tmdbTypes'

export const fetchPopularMovies = (pageNum = 1): Promise<ITMDBMovieListResponse> =>
  fetch(`${url_popular}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error => console.error('ERROR: fetching popular movies failed: ', error))

export const fetchNowPlayingMovies = (pageNum = 1): Promise<ITMDBNowPlayingMovieResponse> =>
  fetch(`${url_now_playing}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error => console.error('ERROR: fetching now playing movies failed: ', error))

export const fetchTopRatedMovies = (pageNum = 1): Promise<ITMDBMovieListResponse> =>
  fetch(`${url_top_rated}&page=${pageNum}`)
    .then(response => response.json())
    .catch(error => console.error('ERROR: fetching top rated movies failed: ', error))

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
    .catch(error => console.error('ERROR: fetching movie details failed: ', error))
