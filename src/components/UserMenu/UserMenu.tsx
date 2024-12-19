import { useState, useContext, useEffect } from "react";
import { Menu, MenuItem, Tooltip, Button, IconButton } from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Person as PersonIcon,
  PersonOutline as PersonOutlineIcon,
} from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";

const tooltipStyles = {
  sx: { backgroundColor: "black", color: "white" },
};
const buttonStyles = {
  gap: "6px",
  paddingLeft: "8px",
  textTransform: "initial",
};
const menuItemStyles = {
  "&:hover": {
    backgroundColor: "initial",
  },
};

const UserMenu = () => {
  const { user, handleSignIn, handleSignInAnonymously, handleSignOut } =
    useContext(AuthContext);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!menuAnchorEl;

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    return () => {
      isOpen && closeMenu();
    };
  }, [isOpen, user]);

  return (
    <>
      <IconButton
        color="primary"
        onClick={openMenu}
        sx={{ position: "absolute", right: 0, color: "white" }}
      >
        <AccountCircleIcon fontSize="large" color="inherit" />
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={isOpen}
        onClose={closeMenu}
        keepMounted
      >
        {user ? (
          <MenuItem sx={menuItemStyles}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleSignOut}
              sx={{
                pl: "inherit",
                ...buttonStyles,
              }}
            >
              Logout
            </Button>
          </MenuItem>
        ) : (
          <>
            <Tooltip
              title="Login using your Google account"
              placement="left"
              slotProps={{ tooltip: tooltipStyles }}
            >
              <MenuItem sx={menuItemStyles}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSignIn}
                  sx={buttonStyles}
                >
                  <PersonIcon />
                  Login
                </Button>
              </MenuItem>
            </Tooltip>

            <Tooltip
              title="Login Anonymously"
              placement="left"
              slotProps={{ tooltip: tooltipStyles }}
            >
              <MenuItem sx={menuItemStyles}>
                <Button
                  color="info"
                  variant="outlined"
                  onClick={handleSignInAnonymously}
                  sx={buttonStyles}
                >
                  <PersonOutlineIcon />
                  Login as Guest
                </Button>
              </MenuItem>
            </Tooltip>
          </>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
