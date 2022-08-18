import { Divider, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";

export const FileMenuOptions: FC<{
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
      <MenuItem onClick={handleOptionClick}>
        <ListItemText> New</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleOptionClick}>
        <ListItemText> Save</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <ListItemText> Load</ListItemText>
      </MenuItem>
    </Menu>
  );
};
