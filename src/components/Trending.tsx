import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid2, Typography, Box } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { AuthContext } from "../context/authContext";

const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";

interface TrendingMovie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string; // "2024-11-20";
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Trending = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState<TrendingMovie[]>([]);

  const fetchTrendingMovies = useCallback(async () => {
    try {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
      const { data } = await axios.get<{ results: TrendingMovie[] }>(url);
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
    <Grid2 container alignItems="center" flexDirection="column">
      <Typography variant="h6" color="warning">
        <WhatshotIcon fontSize="inherit" sx={{ marginRight: "4px" }} />
        Trending
      </Typography>

      <Grid2 container gap={1} justifyContent="center">
        {movies?.map((movie) => {
          return (
            <Box
              key={movie.id}
              onClick={() => alert(`Clicked on the movie "${movie.title}"`)}
              component="img"
              src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
              width="230px"
              height="345px"
              borderRadius="16px"
              boxShadow="0px 1px 5px black"
              sx={(theme) => ({
                cursor: "pointer",
                "&:hover": { filter: "brightness(1.1)", outline: `1px solid ${theme.palette.warning.main}` },
              })}
            />
          );
        })}
      </Grid2>

      <Grid2></Grid2>
    </Grid2>
  );
};

export default Trending;
