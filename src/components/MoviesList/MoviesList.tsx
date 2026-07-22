import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAuthContext } from "../../context/authContext";
import { useFiltersContext } from "../../context/filtersContext";
import { fetchMovies } from "../../api/firestore.service";
import type { FirestoreMovie } from "../../types/Movie";
import { Movie } from "../Movie/Movie";

const MoviesList = () => {
  const { user } = useAuthContext();
  const { filters } = useFiltersContext();
  const [movies, setMovies] = useState<FirestoreMovie[]>([]);

  useEffect(() => {
    if (user?.uid) {
      void (async () => {
        const movies = await fetchMovies(user.uid, filters);
        setMovies(movies);
      })();
    }
  }, [filters, user]);

  const filteredMovies = filters.search
    ? movies.filter(({ NameEng, NameHeb }) => {
        return `${NameEng}${NameHeb}`.toLowerCase().includes(filters.search.toLowerCase());
      })
    : movies;

  if (!user) return null;

  console.log("filters", filters);
  console.log("movies", movies);

  return (
    <Grid container sx={{ gap: 1, justifyContent: "center" }}>
      {filteredMovies.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
    </Grid>
  );
};

export default MoviesList;
