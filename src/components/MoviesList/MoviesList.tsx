import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { fetchMovies } from "../../api/firestore.service";
import type { FirestoreMovie } from "../../types/Movie";
import { Movie } from "../Movie/Movie";

const MoviesList = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState<FirestoreMovie[]>([]);

  useEffect(() => {
    if (user?.uid) {
      (async () => {
        const movies = await fetchMovies(user.uid);
        console.log("movies", movies);
        setMovies(movies);
      })();
    }
  }, [user]);

  if (!user) return null;

  console.log("movies", movies);

  return (
    <Grid container gap={1} justifyContent="center">
      {movies.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
    </Grid>
  );
};

export default MoviesList;
