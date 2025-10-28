import { useContext, useState } from "react";
import { Grid, Box, Typography, Chip, Tooltip, IconButton, Link, Fab } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddIcon from "@mui/icons-material/Add";
import IMDB_LOGO from "../assets/IMDb_Logo.png";
import { MovieContext } from "../context/movieContext";
import MovieTrailer from "./MovieTrailer/MovieTrailer";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const TMDB_IMAGE_SIZE_ORIGINAL = "original";
const TMDB_IMAGE_SIZE_W200 = "w200";

const typographyStyles = { textShadow: "black 1px 0 10px", color: "white" };

const tooltipStyles = { sx: { backgroundColor: "black", color: "white" } };

const MovieHighlight = () => {
  const { movie } = useContext(MovieContext);
  const [trailerDialogOpened, setTrailerDialogOpened] = useState(false);

  if (!movie) return null;

  const imdbId = movie.imdb_id;
  const youTubeTrailer = movie.videos?.results.find((video) => video.official && video.site === "YouTube" && video.type === "Trailer");
  const youTubeTrailerKey = youTubeTrailer?.key;
  const cast = movie?.credits?.cast.slice(0, 3);

  return (
    <Grid container width="1070px" height="600px">
      <Box
        position="absolute"
        width="inherit"
        height="inherit"
        sx={{
          background: `url(${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_ORIGINAL}${movie.backdrop_path}) no-repeat`,
          backgroundSize: "contain",
          maskImage: "linear-gradient(to right, black 75%, transparent 100%)",
          opacity: 0.8,
        }}
      />

      <Grid container flexDirection="column" gap={1} zIndex={1} padding={2} size={12}>
        <Grid container gap={1} alignItems="center" justifyContent="space-between">
          <Grid flexGrow={1}>
            <Typography variant="h5" fontWeight={500} sx={typographyStyles}>
              {movie.title}
            </Typography>
          </Grid>

          {youTubeTrailerKey && (
            <Grid>
              <Tooltip title="Watch Trailer" slotProps={{ tooltip: tooltipStyles }}>
                <IconButton sx={{ p: 0 }}>
                  <YouTubeIcon
                    fontSize="large"
                    sx={{ color: "#FF0000", filter: "drop-shadow(0px 0px 6px black)" }}
                    onClick={() => setTrailerDialogOpened(true)}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>

        <Grid>
          <Typography variant="body1" sx={typographyStyles} maxWidth="400px">
            {movie.overview || movie.Plot}
          </Typography>
        </Grid>

        <Grid container gap={3} alignItems="center">
          <Grid>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"}
            </Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {!!movie.release_date && new Date(movie.release_date).getFullYear()}
            </Typography>
          </Grid>

          <Grid container gap={1}>
            {movie.genres?.map((genre) => (
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
          </Grid>
        </Grid>

        <Grid container gap={1} alignItems="center">
          {imdbId && (
            <Grid>
              <Link href={`https://www.imdb.com/title/${imdbId}`} target="_blank">
                <img src={IMDB_LOGO} width="42px" style={{ verticalAlign: "text-top" }} />
              </Link>
            </Grid>
          )}

          <Grid>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {movie.imdbRating} ({movie.imdbVotes} votes)
            </Typography>
          </Grid>
        </Grid>

        <Grid container gap={0.5} mt="auto" position="relative">
          {cast?.map(
            (actor) =>
              actor.profile_path && (
                <Grid key={actor.id} height="130px" borderRadius={2} position="relative">
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
                    component="a"
                    href={`https://en.wikipedia.org/wiki/${actor.name.trim()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtitle2"
                    fontSize="12px"
                    sx={typographyStyles}
                    width="100%"
                    display="block"
                    position="absolute"
                    bottom={0}
                    textAlign="center"
                  >
                    {actor.name}
                  </Typography>
                </Grid>
              )
          )}

          <Grid sx={{ position: "absolute", left: "50%", top: "calc(100% - 24px)", transform: "translate(-50%, -50%)" }}>
            <Tooltip
              title="Add movie to your watch list"
              arrow
              slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -4] } }] } }}
            >
              <Fab color="primary" size="medium">
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <MovieTrailer trailerKey={youTubeTrailerKey} open={trailerDialogOpened} handleClose={() => setTrailerDialogOpened(false)} />
    </Grid>
  );
};

export default MovieHighlight;
