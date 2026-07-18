import { Box, Card } from "@mui/material";
import type { Movie } from "../../types/Movie";
import { useMovieContext } from "../../context/movieContext";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const MovieCard = ({ isTrending = false, movie }: { isTrending?: boolean; movie: Partial<Movie> }) => {
  const { setMovieId } = useMovieContext();

  return (
    <Card
      key={movie.id}
      onClick={() => setMovieId(movie.id as number)}
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
          outline: `2px solid ${isTrending ? theme.palette.warning.main : theme.palette.primary.main}`,
        },
      })}
    >
      <Box
        component="img"
        src={`${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
        sx={{
          maxWidth: "100%",
          height: "100%",
        }}
      />
    </Card>
  );
};

export default MovieCard;
