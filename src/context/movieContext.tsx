import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Movie, OMDBMovie } from "../types/Movie";
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

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=similar,videos,credits`
        );

        const {
          data: { imdbRating, imdbVotes, Plot },
        } = await axios.get<OMDBMovie>(`https://www.omdbapi.com/?i=${data.imdb_id}&type=movie&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);

        setMovie({ ...data, imdbRating, imdbVotes, Plot });
      } catch (error) {
        console.log("there was an error fetching the movie", error);
      }
    };

    if (user?.uid && movieId) fetchMovie();
  }, [user, movieId]);

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
