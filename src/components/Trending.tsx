import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { AuthContext } from "../context/authContext";
import type { TrendingMovie, TMDBTrendingMovie } from "../types/Movie";
import MovieCard from "./MovieCard/MovieCard";

const Trending = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState<TrendingMovie[]>([]);

  const fetchTrendingMovies = useCallback(async () => {
    try {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
      const { data } = await axios.get<{ results: TMDBTrendingMovie[] }>(url);
      setMovies(data.results);
    } catch (error) {
      console.log("there was an error fetching the movie", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) fetchTrendingMovies();
  }, [user, fetchTrendingMovies]);

  if (!user) return null;

  return (
    <Grid container alignItems="center" flexDirection="column">
      <Typography variant="h6" color="warning">
        <WhatshotIcon fontSize="inherit" sx={{ marginRight: "4px" }} />
        Trending
      </Typography>

      <Grid container gap={1} justifyContent="center">
        {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Grid>

      <Grid></Grid>
    </Grid>
  );
};

export default Trending;
