import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchMovieData } from "../api/movies.service";
import type { Movie } from "../types/Movie";
import { AuthContext } from "./authContext";

export const MovieContext = createContext<{
  movie: Partial<Movie> | null;
  setMovieId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  movie: null,
  setMovieId: () => undefined,
});

const MovieContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movie, setMovie] = useState<Partial<Movie> | null>(null);

  useEffect(() => {
    if (user?.uid && movieId) {
      (async () => {
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
