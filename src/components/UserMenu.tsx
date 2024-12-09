import { styled, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  color: white;
`;

const UserMenu = () => {
  return (
    <>
      <StyledIconButton color="primary" onClick={() => {}}>
        <AccountCircle fontSize="large" color="inherit" />
      </StyledIconButton>
    </>
  );
};

export default UserMenu;
