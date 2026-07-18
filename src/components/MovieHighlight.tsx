import { useState } from "react";
import { Grid, Box, Typography, Chip, Tooltip, IconButton, Link, Fab } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddIcon from "@mui/icons-material/Add";
import IMDB_LOGO from "../assets/IMDb_Logo.png";
import { useMovieContext } from "../context/movieContext";
import MovieTrailer from "./MovieTrailer/MovieTrailer";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const typographyStyles = { textShadow: "black 1px 0 10px", color: "white" };

const tooltipStyles = { sx: { backgroundColor: "black", color: "white" } };

const MovieHighlight = () => {
  const { movie } = useMovieContext();
  const [trailerDialogOpened, setTrailerDialogOpened] = useState(false);

  if (!movie) return null;

  const imdbId = movie.imdb_id;
  const youTubeTrailer = movie.videos?.results.find((video) => video.official && video.site === "YouTube" && video.type === "Trailer");
  const youTubeTrailerKey = youTubeTrailer?.key;
  const cast = movie?.credits?.cast.slice(0, 3);

  return (
    <Grid container sx={{ width: "1070px", height: "600px" }}>
      <Box
        sx={{
          position: "absolute",
          width: "inherit",
          height: "inherit",
          background: `url(${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}) no-repeat`,
          backgroundSize: "contain",
          maskImage: "linear-gradient(to right, black 75%, transparent 100%)",
          opacity: 0.8,
        }}
      />

      <Grid container size={12} sx={{ flexDirection: "column", gap: 1, zIndex: 1, padding: 2 }}>
        <Grid container sx={{ gap: 1, alignItems: "center", justifyContent: "space-between" }}>
          <Grid sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, ...typographyStyles }}>
              {movie.title}
            </Typography>
          </Grid>

          {youTubeTrailerKey && (
            <Grid>
              <Tooltip title="Watch Trailer" slotProps={{ tooltip: tooltipStyles }}>
                <IconButton sx={{ p: 0 }}>
                  <YouTubeIcon
                    fontSize="large"
                    sx={{
                      color: "#FF0000",
                      filter: "drop-shadow(0px 0px 6px black)",
                    }}
                    onClick={() => setTrailerDialogOpened(true)}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>

        <Grid>
          <Typography variant="body1" sx={{ maxWidth: "400px", ...typographyStyles }}>
            {movie.overview || movie.Plot}
          </Typography>
        </Grid>

        <Grid container sx={{ gap: 3, alignItems: "center" }}>
          <Grid>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"}
            </Typography>
          </Grid>

          <Grid>
            <Typography variant="subtitle2" sx={typographyStyles}>
              {!!movie.release_date &&
                new Date(movie.release_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
            </Typography>
          </Grid>

          <Grid container sx={{ gap: 1, alignItems: "center" }}>
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
        </Grid>

        <Grid container sx={{ gap: 1 }}>
          {movie.genres?.map((genre) => (
            <Chip
              key={genre.id}
              size="small"
              variant="outlined"
              label={
                <Typography variant="subtitle2" sx={typographyStyles}>
                  {genre.name}
                </Typography>
              }
              sx={{ borderColor: "white", "& .MuiChip-label": { px: 1.5 } }}
            />
          ))}
        </Grid>

        <Grid container sx={{ gap: 0.5, mt: "auto", position: "relative" }}>
          {cast?.map(
            (actor) =>
              actor.profile_path && (
                <Grid
                  key={actor.id}
                  component="a"
                  href={`https://en.wikipedia.org/wiki/${actor.name.trim()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    height: "160px",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={`${TMDB_IMAGE_BASE_URL}/w200${actor.profile_path}`}
                    alt={movie.title}
                    loading="lazy"
                    sx={{
                      height: "100%",
                      borderRadius: "inherit",
                      boxShadow: "0 0 20px 0px #000000",
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "14px",
                      width: "100%",
                      display: "block",
                      position: "absolute",
                      bottom: 0,
                      textAlign: "center",
                      padding: "0 4px",
                      ...typographyStyles,
                    }}
                  >
                    {actor.name}
                  </Typography>
                </Grid>
              )
          )}

          <Grid
            sx={{
              position: "absolute",
              left: "50%",
              top: "calc(100% - 24px)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Tooltip
              title="Add movie to your watch list"
              arrow
              slotProps={{
                popper: {
                  modifiers: [{ name: "offset", options: { offset: [0, -4] } }],
                },
              }}
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
