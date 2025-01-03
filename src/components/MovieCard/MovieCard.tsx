import { Box, Card } from "@mui/material";
import { TrendingMovie } from "../../types/Movie";

const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movie }: { movie: TrendingMovie }) => {
  return (
    <Card
      key={movie.id}
      onClick={() => alert(`Clicked on the movie "${movie.title}"`)}
      sx={(theme) => ({
        width: "230px",
        height: "345px",
        borderRadius: "16px",
        boxShadow: "0px 1px 5px black",
        cursor: "pointer",
        background: "none",
        "&:hover": { filter: "brightness(1.1)", outline: `1px solid ${theme.palette.warning.main}` },
      })}
    >
      <Box component="img" src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`} alt={movie.title} loading="lazy" />
    </Card>
  );
};

export default MovieCard;
