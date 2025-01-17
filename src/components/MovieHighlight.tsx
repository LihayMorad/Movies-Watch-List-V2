import { Grid2, Box, Typography, Chip, Link } from "@mui/material";
import { useContext } from "react";
import { MovieContext } from "../context/movieContext";

const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const typographyStyles = {
  textShadow: "black 1px 0 10px",
};

const MovieHighlight = () => {
  const { movie } = useContext(MovieContext);

  if (!movie) return null;

  const youTubeTrailer = movie.videos.results.find((video) => video.official && video.site === "YouTube" && video.type === "Trailer");
  const trailerLink = youTubeTrailer && `https://www.youtube.com/watch?v=${youTubeTrailer.key}`;

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
          <Typography variant="h5" sx={typographyStyles}>
            {movie.title}
          </Typography>
        </Grid2>

        <Grid2>
          <Typography variant="body1" sx={typographyStyles} maxWidth="400px">
            {movie.overview}
          </Typography>
        </Grid2>

        <Grid2 container gap={3} alignItems="center">
          <Grid2>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"}
            </Typography>
          </Grid2>

          <Grid2>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {new Date(movie.release_date).getFullYear()}
            </Typography>
          </Grid2>

          <Grid2 container gap={1}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                size="small"
                variant="outlined"
                label={
                  <Typography variant="subtitle2" color="#ffffff" sx={typographyStyles}>
                    {genre.name}
                  </Typography>
                }
                sx={{ borderColor: "white", "& .MuiChip-label": { px: 1.5 } }}
              />
            ))}
          </Grid2>
        </Grid2>

        <Grid2 container gap={2}>
          <Grid2>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {movie.vote_average.toFixed(1)} ({Intl.NumberFormat("en", { notation: "compact" }).format(movie.vote_count)} votes)
            </Typography>
          </Grid2>

          <Grid2>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {"N/A"}
            </Typography>
          </Grid2>

          <Grid2>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {"N/A"}
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 container gap={2}>
          <Grid2>
            <Link href={trailerLink} color="#ffffff">
              Trailer
            </Link>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MovieHighlight;
