import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import { AuthContext } from "./authContext";

export const MovieContext = createContext<{
  movie: Movie | null;
  setMovieId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  movie: null,
  setMovieId: () => undefined,
});

const MovieContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovie = useCallback(async () => {
    try {
      const { data } = await axios.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);

      setMovie(data);
    } catch (error) {
      console.log("there was an error fetching the movie", error);
    }
  }, [user?.uid, movieId]);

  useEffect(() => {
    if (user?.uid && movieId) fetchMovie();
  }, [user, movieId, fetchMovie]);

  return (
    <MovieContext.Provider
      value={{
        movie,
        setMovieId,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
