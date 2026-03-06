import { Grid, Link } from "@mui/material";
import { tabs } from "./config";

interface NavigationMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationMenu = ({ activeTab, onTabChange }: NavigationMenuProps) => {
  return (
    <Grid container alignItems="center" gap="24px" height="50px" paddingX="24px" borderRadius="50px" sx={{ backgroundColor: "#091c2f" }}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <Grid key={tab.id}>
            <Link
              variant="subtitle1"
              onClick={() => onTabChange(tab.id)}
              underline={activeTab === tab.id ? "always" : "hover"}
              color={tab.color}
            >
              <IconComponent fontSize="inherit" sx={{ marginRight: "4px" }} />
              {tab.label}
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NavigationMenu;
