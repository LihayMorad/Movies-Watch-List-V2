import { Grid } from "@mui/material";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserMenu from "./UserMenu/UserMenu";

const Header = () => {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid size={{ xs: 1 }}>
        <Logo />
      </Grid>

      <Grid size={{ xs: "auto" }}>
        <NavigationMenu />
      </Grid>

      <Grid size={{ xs: 1 }}>
        <UserMenu />
      </Grid>
    </Grid>
  );
};

export default Header;
