import axios from "axios";
import type { Movie, OMDBMovie, TMDBMovie, TMDBTrendingMovie } from "../types/Movie";

const VITE_TMDB_API_URL = import.meta.env.VITE_TMDB_API_URL;
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const VITE_OMDB_API_URL = import.meta.env.VITE_OMDB_API_URL;
const VITE_OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchTMDBMovie = async (movieId: number | string): Promise<TMDBMovie> => {
  try {
    const url = `${VITE_TMDB_API_URL}/movie/${movieId}?api_key=${VITE_TMDB_API_KEY}&append_to_response=similar,videos,credits`;
    const { data } = await axios.get<TMDBMovie>(url);

    return data;
  } catch (error) {
    console.log("there was an error fetching TMDB movie", error);
    throw error;
  }
};

export const fetchOMDBMovie = async (imdbId: string): Promise<OMDBMovie> => {
  try {
    const url = `${VITE_OMDB_API_URL}/?i=${imdbId}&type=movie&apikey=${VITE_OMDB_API_KEY}`;
    const { data } = await axios.get<OMDBMovie>(url);

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
    const url = `${VITE_TMDB_API_URL}/trending/movie/week?api_key=${VITE_TMDB_API_KEY}`;
    const { data } = await axios.get<{ results: TMDBTrendingMovie[] }>(url);
    return data.results;
  } catch (error) {
    console.log("there was an error fetching the trending movies", error);
    throw error;
  }
};
