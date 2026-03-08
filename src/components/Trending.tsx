import { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { AuthContext } from "../context/authContext";
import { fetchTrendingMovies } from "../api/movies.service";
import type { TrendingMovie } from "../types/Movie";
import MovieCard from "./MovieCard/MovieCard";

const Trending = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState<TrendingMovie[]>([]);

  useEffect(() => {
    if (user?.uid) {
      (async () => {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      })();
    }
  }, [user, fetchTrendingMovies]);

  if (!user) return null;

  return (
    <Grid container alignItems="center" flexDirection="column">
      <Typography variant="h6" color="warning">
        <WhatshotIcon fontSize="inherit" sx={{ marginRight: "4px" }} />
        Trending
      </Typography>

      <Grid container gap={1} justifyContent="center">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isTrending={true} />
        ))}
      </Grid>

      <Grid></Grid>
    </Grid>
  );
};

export default Trending;
