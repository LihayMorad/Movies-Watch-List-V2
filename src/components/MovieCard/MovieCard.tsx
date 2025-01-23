import { useContext } from "react";
import { Box, Card } from "@mui/material";
import { Movie } from "../../types/Movie";
import { MovieContext } from "../../context/movieContext";

const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { setMovieId } = useContext(MovieContext);

  return (
    <Card
      key={movie.id}
      onClick={() => setMovieId(movie.id)}
      sx={(theme) => ({
        width: "220px",
        height: "337px",
        borderRadius: "16px",
        boxShadow: "0px 1px 5px black",
        cursor: "pointer",
        background: "none",
        transition: "transform 0.15s ease-out",
        "&:hover": {
          transform: "scale(1.05)",
          filter: "brightness(1.1)",
          outline: `1px solid ${theme.palette.warning.main}`,
        },
      })}
    >
      <Box
        component="img"
        maxWidth="100%"
        height="100%"
        src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />
    </Card>
  );
};

export default MovieCard;
