import { Grid2, Box, Typography } from "@mui/material";
import { TrendingMovie } from "../types/Movie";

const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const movie: TrendingMovie = {
  backdrop_path: "/3WnoZw50qIfXsFnKr0LddEh5Jnf.jpg",
  id: 1222248,
  title: "Number 24",
  original_title: "Nr. 24",
  overview:
    "On the brink of the Second World War, a young Norwegian man's drive to resist the Nazis sets a new course for his future – and the future of his country.",
  poster_path: "/rzsmKSFEsEWBLbJ968abffnfYZ7.jpg",
  media_type: "movie",
  adult: false,
  original_language: "no",
  genre_ids: [10752, 36],
  popularity: 27.824,
  release_date: "2024-10-30",
  video: false,
  vote_average: 7.8,
  vote_count: 36,
};

const MovieHighlight = () => {
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
