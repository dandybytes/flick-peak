const tmdbAPIkey = process.env.REACT_APP_TMDB_API_KEY

// url structure: get movie list
// let page
const url_base = 'https://api.themoviedb.org/3'
const url_suffix_key = `?api_key=${tmdbAPIkey}`
const url_suffix_lang = '&language=en-US'
// const url_suffix_page = `&page=${page ?? 1}`

const url_suffix_popular = '/movie/popular'
const url_popular = url_base + url_suffix_popular + url_suffix_key + url_suffix_lang
// const url_complete_popular = url_base + url_suffix_popular + url_suffix_key + url_suffix_lang + url_suffix_page

const url_suffix_now_playing = '/movie/now_playing'
const url_now_playing = url_base + url_suffix_now_playing + url_suffix_key + url_suffix_lang

const url_suffix_top_rated = '/movie/top_rated'
const url_top_rated = url_base + url_suffix_top_rated + url_suffix_key + url_suffix_lang

// url structure: find movies by keyword(s)
const url_suffix_search = '/search/movie'
const url_query = url_base + url_suffix_search + url_suffix_key + url_suffix_lang

// ulr structure: get movie details
// https://api.themoviedb.org/3/movie/446894?api_key=<api-key-here>&language=en-US
const url_details_start = `${url_base}/movie/`
const url_details_end = url_suffix_key + url_suffix_lang
// const url_details = url_details_start + "movie_id" + url_details_end;

// url structure: get movie image (poster or backdrop)
// image url:
const url_img_base = 'https://image.tmdb.org/t/p/'
// "backdrop_sizes": ["w300", "w780", "w1280", "original"]
const url_img_backdrop_size = 'w1280'
// "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
const url_img_poster_size = 'w500'
const url_img_backdrop = url_img_base + url_img_backdrop_size
const url_img_poster = url_img_base + url_img_poster_size

export {
  url_popular,
  // url_complete_popular,
  url_now_playing,
  url_top_rated,
  url_query,
  url_details_start,
  url_details_end,
  url_img_backdrop,
  url_img_poster
}
