import { Divider, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { StyledListItemText } from "./StyledListItemText";

export const ViewsMenuOptions: FC<{
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
}> = ({ onClose, open, anchorEl }) => {
  const handleOptionClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        dense: true,
      }}
    >
      <MenuItem disabled>
        <ListItemText> Tools Pane</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Tools Panel</StyledListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Dimensions</StyledListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Tools</StyledListItemText>
      </MenuItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText> Animation Pane</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Animation Panel</StyledListItemText>
      </MenuItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText> Preview Pane</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Preview Pane</StyledListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Palette</StyledListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <StyledListItemText inset>Toggle Preview</StyledListItemText>
      </MenuItem>
    </Menu>
  );
};
