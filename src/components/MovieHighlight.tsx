import { Grid2, Box, Typography, Chip } from "@mui/material";
import { useContext } from "react";
import { MovieContext } from "../context/movieContext";

const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieHighlight = () => {
  const { movie } = useContext(MovieContext);

  if (!movie) return null;

  return (
    <Grid2 container height="600px">
      <Box
        position="absolute"
        width="1070px"
        height="inherit"
        sx={{
          background: `url(${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}) no-repeat`,
          backgroundSize: "contain",
          maskImage: "linear-gradient(to right, black 75%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      <Grid2 container flexDirection="column" gap={1} zIndex={1} padding={2}>
        <Grid2 mb={1}>
          <Typography variant="h5">{movie.title}</Typography>
        </Grid2>

        <Grid2>
          <Typography variant="body1" maxWidth="400px">
            {movie.overview}
          </Typography>
        </Grid2>

        <Grid2 container gap={3} alignItems="center">
          <Grid2>
            <Typography variant="subtitle2">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </Typography>
          </Grid2>

          <Grid2>
            <Typography variant="subtitle2">{new Date(movie.release_date).getFullYear()}</Typography>
          </Grid2>

          <Grid2 container gap={1}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                size="small"
                variant="outlined"
                label={
                  <Typography variant="subtitle2" color="#ffffff">
                    {genre.name}
                  </Typography>
                }
                sx={{ "& .MuiChip-label": { px: 1.5 } }}
              />
            ))}
          </Grid2>
        </Grid2>

        <Grid2 container gap={2}>
          <Grid2>
            <Typography variant="subtitle2">
              {movie.vote_average.toFixed(1)} ({Intl.NumberFormat("en", { notation: "compact" }).format(movie.vote_count)} votes)
            </Typography>
          </Grid2>

          <Grid2>
            <Typography variant="subtitle2">{"N/A"}</Typography>
          </Grid2>

          <Grid2>
            <Typography variant="subtitle2">{"N/A"}</Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MovieHighlight;
