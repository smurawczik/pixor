import { ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { layoutActions } from "../../../redux/layout/layout.slice";
import { StyledListItemText } from "./StyledListItemText";

export const ViewsMenuOptions: FC<{
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
}> = ({ onClose, open, anchorEl }) => {
  const dispatch = useAppDispatch();

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
        <ListItemText> Panels</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(layoutActions.changePaneVisibility("toolsPane"));
          handleOptionClick();
        }}
      >
        <StyledListItemText inset>Toggle Tools Panel</StyledListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(layoutActions.changePaneVisibility("helpersPane"));
          handleOptionClick();
        }}
      >
        <StyledListItemText inset>Toggle Preview Pane</StyledListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(layoutActions.changePaneVisibility("animationPane"));
          handleOptionClick();
        }}
      >
        <StyledListItemText inset>Toggle Animation Panel</StyledListItemText>
      </MenuItem>
    </Menu>
  );
};
