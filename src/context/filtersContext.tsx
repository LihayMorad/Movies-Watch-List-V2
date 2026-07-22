import { createContext, type FunctionComponent, useContext, useEffect, useState } from "react";
import type { Filters } from "../types/Filters";

const FILTERS_STORAGE_KEY = "filters";

type FiltersContextValue = {
  filters: Filters;
  updateFilters: (filters: Partial<Filters>) => void;
};

const DEFAULT_FILTERS: Filters = {
  sortBy: "releaseYear",
  orderBy: "descending",
  year: "All",
  maxResults: 10,
  showWatchedMovies: false,
  search: "",
};

export const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersContext provider");
  }

  return context;
};

const FiltersContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    const localStorageFilters = localStorage.getItem(FILTERS_STORAGE_KEY);

    if (localStorageFilters) {
      try {
        setFilters(JSON.parse(localStorageFilters) as Filters);
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

  return <FiltersContext.Provider value={{ filters, updateFilters }}>{children}</FiltersContext.Provider>;
};

export default FiltersContextProvider;
