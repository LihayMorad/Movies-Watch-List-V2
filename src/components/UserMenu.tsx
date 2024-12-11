import { useState, useContext } from "react";
import { styled, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../context/authContext";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  color: white;
`;

const UserMenu = () => {
  const { user, handleSignIn, handleSignOut } = useContext(AuthContext);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!menuAnchorEl;

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton color="primary" onClick={openMenu}>
        <AccountCircle fontSize="large" color="inherit" />
      </StyledIconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={isOpen}
        onClose={closeMenu}
        keepMounted
      >
        <MenuItem>
          <Button onClick={user ? handleSignOut : handleSignIn}>
            {user ? "Logout" : "Login"}
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
