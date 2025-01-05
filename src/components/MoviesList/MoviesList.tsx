import { useCallback, useContext, useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, DocumentData } from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { firestore } from "../../config/firebase";

const MoviesList = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState<DocumentData[]>([]);

  //   console.log(user); // uid, email, displayName, isAnonymous

  const fetchMovies = useCallback(async () => {
    try {
      const moviesCollection = await getDocs(collection(firestore, `mymovies/${user?.uid}/movies`));
      //   console.log("moviesCollection", moviesCollection);

      setMovies(moviesCollection.docs.map((item) => item.data()));

      //   moviesCollection.forEach((doc) => {
      //     console.log("doc", doc.id, doc.data());
      //   });
    } catch (error) {
      console.log("there was an error fetching the movies list", error);
    }
  }, [user?.uid]);

  const fetchMovie = useCallback(async () => {
    try {
      const movieId = "wqhJTn7XzeZJfGUWIOZ5";
      const docRef = doc(firestore, `mymovies/${user?.uid}/movies/${movieId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("there was an error fetching the movie", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) fetchMovies();
  }, [user, fetchMovies]);

  if (!user) return null;

  return (
    <ul>
      {movies.map((movie) => {
        // console.log(movie);

        return <li>{movie.NameEng}</li>;
      })}
    </ul>
  );
};

export default MoviesList;
