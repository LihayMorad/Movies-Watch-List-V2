import axios from "axios";
import type { Movie, OMDBMovie, TMDBMovie, TMDBTrendingMovie } from "../types/Movie";

const { VITE_TMDB_API_URL, VITE_TMDB_API_KEY, VITE_OMDB_API_URL, VITE_OMDB_API_KEY } = import.meta.env;

export const fetchTMDBMovie = async (movieId: number | string): Promise<TMDBMovie> => {
  try {
    const { data } = await axios.get<TMDBMovie>(`${VITE_TMDB_API_URL}/movie/${movieId}`, {
      params: { api_key: VITE_TMDB_API_KEY, append_to_response: "similar,videos,credits" },
    });

    return data;
  } catch (error) {
    console.log("there was an error fetching TMDB movie", error);
    throw error;
  }
};

export const fetchOMDBMovie = async (imdbId: string): Promise<OMDBMovie> => {
  try {
    const { data } = await axios.get<OMDBMovie>(`${VITE_OMDB_API_URL}/`, {
      params: { apikey: VITE_OMDB_API_KEY, i: imdbId, type: "movie" },
    });

    return data;
  } catch (error) {
    console.log("there was an error fetching OMDB movie", error);
    throw error;
  }
};

export const fetchMovieData = async (movieId: number | string): Promise<Partial<Movie>> => {
  try {
    const tmdbMovie = await fetchTMDBMovie(movieId);
    const { imdbRating, imdbVotes, Plot } = await fetchOMDBMovie(tmdbMovie.imdb_id);

    return { ...tmdbMovie, imdbRating, imdbVotes, Plot };
  } catch (error) {
    console.log("there was an error fetching the movie", error);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get<{ results: TMDBTrendingMovie[] }>(`${VITE_TMDB_API_URL}/trending/movie/week`, {
      params: { api_key: VITE_TMDB_API_KEY },
    });
    return data.results;
  } catch (error) {
    console.log("there was an error fetching the trending movies", error);
    throw error;
  }
};
