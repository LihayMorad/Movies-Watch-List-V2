import { useContext, useState } from "react";
import { Grid2, Box, Typography, Chip, Tooltip, IconButton } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { MovieContext } from "../context/movieContext";
import MovieTrailer from "./MovieTrailer/MovieTrailer";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const TMDB_IMAGE_SIZE_ORIGINAL = "original";
const TMDB_IMAGE_SIZE_W200 = "w200";

const typographyStyles = {
  textShadow: "black 1px 0 10px",
};

const tooltipStyles = {
  sx: { backgroundColor: "black", color: "white" },
};

const MovieHighlight = () => {
  const { movie } = useContext(MovieContext);
  const [trailerDialogOpened, setTrailerDialogOpened] = useState(false);

  if (!movie) return null;

  const youTubeTrailer = movie.videos?.results.find((video) => video.official && video.site === "YouTube" && video.type === "Trailer");
  const youTubeTrailerKey = youTubeTrailer?.key;

  const cast = movie.credits.cast.slice(0, 3);

  return (
    <Grid2 container height="600px">
      <Box
        position="absolute"
        width="1070px"
        height="inherit"
        sx={{
          background: `url(${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_ORIGINAL}${movie.backdrop_path}) no-repeat`,
          backgroundSize: "contain",
          maskImage: "linear-gradient(to right, black 75%, transparent 100%)",
          opacity: 0.8,
        }}
      />

      <Grid2 container flexDirection="column" gap={1} zIndex={1} padding={2}>
        <Grid2 container gap={2} alignItems="center">
          <Grid2>
            <Typography variant="h5" sx={typographyStyles}>
              {movie.title}
            </Typography>
          </Grid2>

          {youTubeTrailerKey && (
            <Grid2>
              <Tooltip title="Watch Trailer" slotProps={{ tooltip: tooltipStyles }}>
                <IconButton sx={{ p: 0 }}>
                  <YouTubeIcon
                    fontSize="large"
                    sx={{ color: "#FF0000", filter: "drop-shadow(0px 0px 6px black)" }}
                    onClick={() => setTrailerDialogOpened(true)}
                  />
                </IconButton>
              </Tooltip>
            </Grid2>
          )}
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

        <Grid2 container gap={0.5}>
          {cast.map(
            (actor) =>
              actor.profile_path && (
                <Grid2 key={actor.id} height="130px" borderRadius={2} position="relative">
                  <Box
                    component="img"
                    height="100%"
                    src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_W200}${actor.profile_path}`}
                    alt={movie.title}
                    loading="lazy"
                    borderRadius="inherit"
                    boxShadow="0 0 20px 0px #000000"
                  />
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    sx={typographyStyles}
                    width="100%"
                    position="absolute"
                    bottom={0}
                    textAlign="center"
                  >
                    {actor.name}
                  </Typography>
                </Grid2>
              )
          )}
        </Grid2>
      </Grid2>

      <MovieTrailer trailerKey={youTubeTrailerKey} open={trailerDialogOpened} handleClose={() => setTrailerDialogOpened(false)} />
    </Grid2>
  );
};

export default MovieHighlight;
