import { Divider, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { exportCurrentStore } from "../fileMenu.helpers";

export const FileMenuOptions: FC<{
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
}> = ({ onClose, open, anchorEl }) => {
  const handleOptionClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleExport = useCallback(async () => {
    await exportCurrentStore();
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
      <MenuItem onClick={handleExport}>
        <ListItemText>
          Export <small>(json)</small>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOptionClick}>
        <ListItemText>
          Import <small>(json)</small>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};
