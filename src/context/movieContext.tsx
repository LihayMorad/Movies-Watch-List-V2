import { createContext, useState } from "react";
import { TrendingMovie } from "../types/Movie";

export const MovieContext = createContext<{
  movie: TrendingMovie | null;
  setMovie: React.Dispatch<React.SetStateAction<TrendingMovie | null>>;
}>({
  movie: null,
  setMovie: () => undefined,
});

const MovieContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [movie, setMovie] = useState<TrendingMovie | null>(null);

  return (
    <MovieContext.Provider
      value={{
        movie,
        setMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
