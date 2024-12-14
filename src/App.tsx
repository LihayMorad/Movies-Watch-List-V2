import "./styles/main.scss";
import Logo from "./components/Logo";
import UserMenu from "./components/UserMenu/UserMenu";
import UserContextProvider from "./context/authContext";
import FiltersContextProvider from "./context/filtersContext";

function App() {
  return (
    <UserContextProvider>
      <FiltersContextProvider>
        <Logo />
        <UserMenu />
      </FiltersContextProvider>
    </UserContextProvider>
  );
}

export default App;
