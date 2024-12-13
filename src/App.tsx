import "./styles/main.scss";
import Logo from "./components/Logo";
import UserMenu from "./components/UserMenu/UserMenu";
import UserContextProvider from "./context/authContext";

function App() {
  return (
    <UserContextProvider>
      <Logo />
      <UserMenu />
    </UserContextProvider>
  );
}

export default App;
