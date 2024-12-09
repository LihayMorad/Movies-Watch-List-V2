import { useState } from "react";
import { styled, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  color: white;
`;

const UserMenu = () => {
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
        <MenuItem>AAA</MenuItem>
        <MenuItem>BBB</MenuItem>
        <MenuItem>CCC</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
