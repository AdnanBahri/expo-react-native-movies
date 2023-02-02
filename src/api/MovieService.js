import { ENDPOINTS } from "../utils/Urls";
import { Client } from "./Client";

export const getData = async (endpoint, page) => {
  const resp = await Client.get(endpoint, { params: { page: page } });
  const data = await resp?.data;
  return {
    page: data.page,
    movies: data.results,
    totalPages: data.total_pages,
  };
};

export const getCastMovies = async (endpoint) => {
  const resp = await Client.get(endpoint);
  const data = await resp?.data;
  return {
    movies: [data.cast, data.crew].flat(),
  };
};

export const getToRatedMovies = async (page) => {
  try {
    const resp = await Client.get(ENDPOINTS.TOP_RATED, {
      params: {
        page,
      },
    });
    return (data = await resp?.data);
  } catch (error) {
    return null;
  }
};

export const getLatestMovies = async (page) => {
  try {
    const resp = await Client.get(ENDPOINTS.LATEST, {
      params: {
        page,
      },
    });
    return (data = await resp?.data);
  } catch (error) {
    return null;
  }
};

export const getNowPlayingMovies = async (page) => {
  try {
    const resp = await Client.get(ENDPOINTS.NOW_PLAYING, {
      params: {
        page,
      },
    });
    return (data = await resp?.data);
  } catch (error) {
    return null;
  }
};

export const getUpComingMovies = async (page) => {
  try {
    const resp = await Client.get(ENDPOINTS.UP_COMING, {
      params: {
        page,
      },
    });
    return (data = await resp?.data);
  } catch (error) {
    return null;
  }
};

export const getSimilarMovies = async (movie_id, page) => {
  try {
    const resp = await Client.get(
      ENDPOINTS.SIMILAR_MOVIES_BY_ID(movie_id, {
        params: {
          page,
        },
      })
    );
    return (data = await resp?.data);
  } catch (error) {
    return null;
  }
};

export const getMovieDetails = async (movie_id) =>
  Client.get(ENDPOINTS.MOVIE_DTAILS(movie_id));

export const getMovieVideos = async (movie_id) =>
  Client.get(ENDPOINTS.MOVIES_VIDEOS_BY_ID(movie_id));

export const getPersonDetails = async (person_id) =>
  Client.get(ENDPOINTS.PERSON_DETAILS_BY_ID(person_id));

export const getPersonMovies = async (person_id) =>
  Client.get(ENDPOINTS.PERSON_MOVIES_BY_ID(person_id));

export const getPersonPhotos = async (person_id) =>
  Client.get(ENDPOINTS.PERSON_PHOTOS_BY_ID(person_id));
