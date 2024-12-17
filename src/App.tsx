import { StyledEngineProvider } from "@mui/material/styles";
import "./styles/main.scss";
import Logo from "./components/Logo";
import UserMenu from "./components/UserMenu/UserMenu";
import FiltersMenu from "./components/FiltersMenu/FiltersMenu";
import UserContextProvider from "./context/authContext";
import FiltersContextProvider from "./context/filtersContext";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <UserContextProvider>
        <FiltersContextProvider>
          <Logo />
          <UserMenu />
          <FiltersMenu />
        </FiltersContextProvider>
      </UserContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
