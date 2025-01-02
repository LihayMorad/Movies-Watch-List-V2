import { Grid2 } from "@mui/material";
import Logo from "./Logo";
import UserMenu from "./UserMenu/UserMenu";

const Header = () => {
  return (
    <Grid2 container alignItems="center">
      <Grid2 maxWidth={250}>
        <Logo />
      </Grid2>
      <Grid2>NavigationMenu</Grid2>
      <Grid2>
        <UserMenu />
      </Grid2>
    </Grid2>
  );
};

export default Header;
