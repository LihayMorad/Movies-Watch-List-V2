import { createContext, FunctionComponent, useEffect, useState } from "react";

const FILTERS_STORAGE_KEY = "filters";
interface IFilters {
  sortBy: /* filter*/ string;
  orderBy: string;
  year: number | "All";
  maxResults: number;
  showWatchedMovies: boolean;
}

const DEFAULT_FILTERS: IFilters = {
  sortBy: "releaseYear",
  orderBy: "descending",
  year: "All",
  maxResults: 10,
  showWatchedMovies: false,
};

export const FiltersContext = createContext<{
  filters: IFilters;
  updateFilters: (filters: IFilters) => void;
}>({
  filters: DEFAULT_FILTERS,
  updateFilters: () => undefined,
});

const FiltersContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [filters, setFilters] = useState<IFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    const localStorageFilters = localStorage.getItem(FILTERS_STORAGE_KEY);

    if (localStorageFilters) {
      try {
        setFilters(JSON.parse(localStorageFilters));
      } catch (error) {}
    }
  }, []);

  const updateFilters = (filters: IFilters) => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
    setFilters((prev) => ({ ...prev, ...filters }));
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;
