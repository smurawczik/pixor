import { ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { canvasActions } from "../../../redux/canvas/canvas.slice";
import { useAppDispatch } from "../../../redux/hooks";

export const EditMenuOptions: FC<{
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
}> = ({ onClose, open, anchorEl }) => {
  const dispatch = useAppDispatch();
  const handleOptionClick = useCallback(() => {
    dispatch(canvasActions.changeToGrayscale());
    onClose();
  }, [dispatch, onClose]);

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
        <ListItemText>image grayscale</ListItemText>
      </MenuItem>
      {/* <Divider /> */}
      {/* <MenuItem onClick={handleExport}>
        <ListItemText>Export</ListItemText>
      </MenuItem> */}
    </Menu>
  );
};
