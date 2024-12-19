import { Grid2 } from "@mui/material";
import logo from "../assets/Logo.png";

const Logo = () => (
  <Grid2 container justifyContent="center">
    <a href="/">
      <img className="headerLogo" src={logo} alt="Movies Watch List" />
    </a>
  </Grid2>
);

export default Logo;
