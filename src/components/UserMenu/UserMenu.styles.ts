import { styled, IconButton, MenuItem, Button } from "@mui/material";

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  color: white;
`;

export const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: initial;
  }
`;

export const StyledButton = styled(Button)`
  gap: 6px;
  padding-left: 8px;
  text-transform: initial;
`;

export const tooltipStyles = {
  sx: { backgroundColor: "black", color: "white" },
};
