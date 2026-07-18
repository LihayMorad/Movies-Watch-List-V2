import { useEffect, useState } from "react";
import { fetchMovieData } from "../../api/movies.service";
import MovieCard from "../MovieCard/MovieCard";
import type { FirestoreMovie, Movie as MovieType } from "../../types/Movie";

export const Movie = ({ movie }: { movie: FirestoreMovie }) => {
  const [movieData, setMovieData] = useState<Partial<MovieType> | null>(null);

  useEffect(() => {
    void (async () => {
      const data = await fetchMovieData(movie.imdbID);
      setMovieData(data);
    })();
  }, [movie]);

  if (!movieData) return null;

  return <MovieCard key={movie.id} movie={movieData} />;
};
