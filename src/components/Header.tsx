import { Grid } from "@mui/material";
import Logo from "./Logo";
import NavigationMenu from "./Navigation/NavigationMenu";
import UserMenu from "./UserMenu/UserMenu";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid size={{ xs: 1 }}>
        <Logo />
      </Grid>

      <Grid size={{ xs: "auto" }}>
        <NavigationMenu activeTab={activeTab} onTabChange={onTabChange} />
      </Grid>

      <Grid size={{ xs: 1 }}>
        <UserMenu />
      </Grid>
    </Grid>
  );
};

export default Header;
