import { useState } from "react";
import { Grid, Link } from "@mui/material";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const tabs = [
  { label: "Watchlist", icon: SubscriptionsIcon, color: "#ffffff" },
  { label: "Trending", icon: WhatshotIcon, color: "warning" },
];

const NavigationMenu = () => {
  const [activeRoute, setActiveRoute] = useState(tabs[0].label);

  return (
    <Grid container alignItems="center" gap="24px" height="50px" paddingX="24px" borderRadius="50px" sx={{ backgroundColor: "#091c2f" }}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <Grid key={tab.label}>
            <Link
              variant="subtitle1"
              onClick={() => setActiveRoute(tab.label)}
              underline={activeRoute === tab.label ? "always" : "hover"}
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
