import { Grid2, Box, Typography } from "@mui/material";
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
          <Typography variant="body2" maxWidth="350px">
            {movie.overview}
          </Typography>
        </Grid2>

        <Grid2 container gap={2}>
          <Grid2>
            <Typography variant="body1">{"N/Ah N/Amin"}</Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{new Date(movie.release_date).getFullYear()}</Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{"N/A genre"}</Typography>
          </Grid2>
        </Grid2>

        <Grid2 container gap={2}>
          <Grid2>
            <Typography variant="body1">
              {movie.vote_average} ({movie.vote_count}) votes
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{"N/A"}</Typography>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{"N/A"}</Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MovieHighlight;
