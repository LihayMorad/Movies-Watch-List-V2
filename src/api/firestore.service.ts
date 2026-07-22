import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";
import { firestore } from "../config/firebase";
import type { Filters } from "../types/Filters";
import type { FirestoreMovie } from "../types/Movie";

export const fetchMovies = async (userId: string, filters: Filters): Promise<FirestoreMovie[]> => {
  const moviesRef = collection(firestore, `mymovies/${userId}/movies`) as CollectionReference<FirestoreMovie>;
  const sortBy = filters.sortBy === "releaseYear" ? "Year" : filters.sortBy;
  const order = filters.orderBy === "descending" ? "desc" : "asc";

  let moviesQuery;

  if (filters.year === "All") {
    moviesQuery = query(moviesRef, orderBy(sortBy, order), where("Watched", "==", filters.showWatchedMovies), limit(filters.maxResults));
  } else if (sortBy !== "Year") {
    moviesQuery = query(
      moviesRef,
      where("Year", "==", filters.year),
      orderBy(sortBy, order),
      where("Watched", "==", filters.showWatchedMovies),
      limit(filters.maxResults)
    );
  } else {
    moviesQuery = query(
      moviesRef,
      where("Year", "==", filters.year),
      where("Watched", "==", filters.showWatchedMovies),
      limit(filters.maxResults)
    );
  }

  const moviesCollection = await getDocs(moviesQuery);

  return moviesCollection.docs.map((item) => ({ id: item.id, ...(item.data() as object) }) as FirestoreMovie);
};

export const fetchMovie = async (userId: string, movieId: string): Promise<FirestoreMovie | null> => {
  const docRef = doc(firestore, `mymovies/${userId}/movies/${movieId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as FirestoreMovie;
  } else {
    return null;
  }
};
