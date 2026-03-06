import { useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import "./styles/main.scss";
import FiltersMenu from "./components/FiltersMenu/FiltersMenu";
import UserContextProvider from "./context/authContext";
import FiltersContextProvider from "./context/filtersContext";
import MovieContextProvider from "./context/movieContext";
import MoviesList from "./components/MoviesList/MoviesList";
import Header from "./components/Header";
import Trending from "./components/Trending";
import MovieHighlight from "./components/MovieHighlight";
import { tabs, WATCHLIST_TAB } from "./components/Navigation/config";

function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <StyledEngineProvider injectFirst>
      <UserContextProvider>
        <FiltersContextProvider>
          <MovieContextProvider>
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === WATCHLIST_TAB && <FiltersMenu />}

            <MovieHighlight />

            {activeTab === WATCHLIST_TAB ? <MoviesList /> : <Trending />}
          </MovieContextProvider>
        </FiltersContextProvider>
      </UserContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
