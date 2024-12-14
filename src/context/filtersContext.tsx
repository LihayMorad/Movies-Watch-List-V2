import { createContext, FunctionComponent, useEffect, useState } from "react";
import { Filters } from "../types/Filters";

const FILTERS_STORAGE_KEY = "filters";

const DEFAULT_FILTERS: Filters = {
  sortBy: "releaseYear",
  orderBy: "descending",
  year: "All",
  maxResults: 10,
  showWatchedMovies: false,
};

export const FiltersContext = createContext<{
  filters: Filters;
  updateFilters: (filters: Partial<Filters>) => void;
}>({
  filters: DEFAULT_FILTERS,
  updateFilters: () => undefined,
});

const FiltersContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    const localStorageFilters = localStorage.getItem(FILTERS_STORAGE_KEY);

    if (localStorageFilters) {
      try {
        setFilters(JSON.parse(localStorageFilters));
      } catch (error) {}
    }
  }, []);

  const updateFilters = (filters: Partial<Filters>) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...filters };
      localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(updatedFilters));
      return updatedFilters;
    });
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
