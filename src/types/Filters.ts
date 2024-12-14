export interface Filters {
  sortBy: "releaseYear" | "NameEng" | "NameHeb" | "imdbRating";
  orderBy: "descending" | "ascending";
  year: number | "All";
  maxResults: number;
  showWatchedMovies: boolean;
}
