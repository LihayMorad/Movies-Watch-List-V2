import { Button, Grid } from "@mui/material";
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
            <Button
              disableRipple
              variant="text"
              startIcon={<IconComponent fontSize="inherit" />}
              onClick={() => onTabChange(tab.id)}
              sx={{
                color: tab.color,
                textTransform: "none",
                fontWeight: activeTab === tab.id ? 500 : 400,
                "& .MuiButton-startIcon": { marginRight: "4px" },
              }}
            >
              {tab.label}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NavigationMenu;
