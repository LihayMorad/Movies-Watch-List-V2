import { useState } from "react";
import { Grid2, Link } from "@mui/material";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const WATCHLIST = "WATCHLIST";
const TRENDING = "TRENDING";

const NavigationMenu = () => {
  const [activeRoute, setActiveRoute] = useState(WATCHLIST);

  return (
    <Grid2 container alignItems="center" gap="24px" height="50px" paddingX="24px" borderRadius="50px" sx={{ backgroundColor: "#091c2f" }}>
      <Grid2>
        <Link
          variant="subtitle1"
          onClick={() => setActiveRoute(WATCHLIST)}
          underline={activeRoute === WATCHLIST ? "always" : "hover"}
          color="#ffffff"
        >
          <SubscriptionsIcon fontSize="inherit" sx={{ marginRight: "4px" }} />
          Watchlist
        </Link>
      </Grid2>

      <Grid2>
        <Link
          variant="subtitle1"
          onClick={() => setActiveRoute(TRENDING)}
          underline={activeRoute === TRENDING ? "always" : "hover"}
          color="warning"
        >
          <WhatshotIcon fontSize="inherit" sx={{ marginRight: "4px" }} />
          Trending
        </Link>
      </Grid2>
    </Grid2>
  );
};

export default NavigationMenu;
