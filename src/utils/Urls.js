const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const TMDB_API_KEY = "your_api_key";

const ENDPOINTS = {
  NOW_PLAYING: "/movie/now_playing",
  POPULAR: "/movie/popular",
  TOP_RATED: "/movie/top_rated",
  LATEST: "/movie/latest",
  UP_COMING: "/movie/upcoming",
  MOVIE_CREDITS: (movie_id) => `/movie/${movie_id}/credits`,
  SIMILAR_MOVIES_BY_ID: (movie_id) => `/movie/${movie_id}/similar`,
  PERSON_DETAILS_BY_ID: (person_id) => `/person/${person_id}`,
  PERSON_PHOTOS_BY_ID: (person_id) => `/person/${person_id}/images`,
  PERSON_MOVIES_BY_ID: (person_id) => `/person/${person_id}/movie_credits`,
};

export { TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_API_KEY, ENDPOINTS };
