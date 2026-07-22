import type { FirestoreMovie } from "./Movie";

export interface Filters {
  sortBy: "releaseYear" | Extract<keyof FirestoreMovie, "NameEng" | "NameHeb" | "imdbRating">;
  orderBy: "descending" | "ascending";
  year: number | "All";
  maxResults: number;
  showWatchedMovies: boolean;
  search: string;
}
