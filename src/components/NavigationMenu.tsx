import { Grid2, Link } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const NavigationMenu = () => {
  return (
    <Grid2 container alignItems="center" gap="24px">
      <Grid2>
        <Link variant="subtitle1" href="#" underline="hover">
          Watchlist
        </Link>
      </Grid2>

      <Grid2>
        <Link variant="subtitle1" href="#" underline="hover" color="warning">
          <WhatshotIcon fontSize="inherit" />
          Trending
        </Link>
      </Grid2>
    </Grid2>
  );
};

export default NavigationMenu;
