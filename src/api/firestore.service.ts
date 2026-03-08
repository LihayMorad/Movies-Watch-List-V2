import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import type { FirestoreMovie } from "../types/Movie";

export const fetchMovies = async (userId: string): Promise<FirestoreMovie[]> => {
  const moviesCollection = await getDocs(collection(firestore, `mymovies/${userId}/movies`));

  return moviesCollection.docs
    .slice(0, 10) // TODO - remove
    .map((item) => ({ id: item.id, ...item.data() }) as FirestoreMovie);
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
