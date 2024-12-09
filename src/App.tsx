import "./styles/main.scss";
import Logo from "./components/Logo";
import UserMenu from "./components/UserMenu";

function App() {
  console.log(import.meta.env);

  return (
    <>
      <Logo />
      <UserMenu />
    </>
  );
}

export default App;
