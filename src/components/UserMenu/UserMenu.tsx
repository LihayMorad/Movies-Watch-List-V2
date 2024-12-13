import { useState, useContext, useEffect } from "react";
import { Menu, Tooltip } from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Person as PersonIcon,
  PersonOutline as PersonOutlineIcon,
} from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";
import {
  StyledIconButton,
  StyledMenuItem,
  StyledButton,
  tooltipStyles,
} from "./UserMenu.styles";

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
      <StyledIconButton color="primary" onClick={openMenu}>
        <AccountCircleIcon fontSize="large" color="inherit" />
      </StyledIconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={isOpen}
        onClose={closeMenu}
        keepMounted
      >
        {user ? (
          <StyledMenuItem>
            <StyledButton
              color="secondary"
              variant="outlined"
              onClick={handleSignOut}
              sx={{ pl: "inherit" }}
            >
              Logout
            </StyledButton>
          </StyledMenuItem>
        ) : (
          <>
            <Tooltip
              title="Login using your Google account"
              placement="left"
              slotProps={{ tooltip: tooltipStyles }}
            >
              <StyledMenuItem>
                <StyledButton
                  color="primary"
                  variant="contained"
                  onClick={handleSignIn}
                >
                  <PersonIcon />
                  Login
                </StyledButton>
              </StyledMenuItem>
            </Tooltip>

            <Tooltip
              title="Login Anonymously"
              placement="left"
              slotProps={{ tooltip: tooltipStyles }}
            >
              <StyledMenuItem>
                <StyledButton
                  color="info"
                  variant="outlined"
                  onClick={handleSignInAnonymously}
                >
                  <PersonOutlineIcon />
                  Login as Guest
                </StyledButton>
              </StyledMenuItem>
            </Tooltip>
          </>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
