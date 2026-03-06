import { StyledEngineProvider } from "@mui/material/styles";
import "./styles/main.scss";
import FiltersMenu from "./components/FiltersMenu/FiltersMenu";
import UserContextProvider from "./context/authContext";
import FiltersContextProvider from "./context/filtersContext";
import MovieContextProvider from "./context/movieContext";
import MoviesList from "./components/MoviesList/MoviesList";
import Header from "./components/Header";

function App() {

  return (
    <StyledEngineProvider injectFirst>
      <UserContextProvider>
        <FiltersContextProvider>
          <MovieContextProvider>
            <Header />
            <FiltersMenu />
            <MoviesList />
          </MovieContextProvider>
        </FiltersContextProvider>
      </UserContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
