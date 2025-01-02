import { Grid2 } from "@mui/material";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserMenu from "./UserMenu/UserMenu";

const Header = () => {
  return (
    <Grid2 container alignItems="center" justifyContent="space-between">
      <Grid2 size={{ xs: 1 }}>
        <Logo />
      </Grid2>

      <Grid2 size={{ xs: "auto" }}>
        <NavigationMenu />
      </Grid2>

      <Grid2 size={{ xs: 1 }}>
        <UserMenu />
      </Grid2>
    </Grid2>
  );
};

export default Header;
