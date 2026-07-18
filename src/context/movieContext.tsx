import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchMovieData } from "../api/movies.service";
import type { Movie } from "../types/Movie";
import { useAuthContext } from "./authContext";

type MovieContextValue = {
  movie: Partial<Movie> | null;
  setMovieId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const MovieContext = createContext<MovieContextValue | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovieContext must be used within a MovieContext provider");
  }

  return context;
};

const MovieContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuthContext();
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movie, setMovie] = useState<Partial<Movie> | null>(null);

  useEffect(() => {
    if (user?.uid && movieId) {
      void (async () => {
        const movieData = await fetchMovieData(movieId);
        setMovie(movieData);
      })();
    }
  }, [user, movieId]);

  const value = useMemo(
    () => ({
      movie,
      setMovieId,
    }),
    [movie]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
