import { Divider, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, SyntheticEvent, useCallback, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../redux/hooks";
import { storeThunkActions } from "../../../redux/store.thunk";
import { exportCurrentStore, importStore } from "../fileMenu.helpers";

const StyledInputFile = styled.input`
  position: absolute;
  left: -9999px;
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

export const FileMenuOptions: FC<{
  onClose: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
}> = ({ onClose, open, anchorEl }) => {
  const dispatch = useAppDispatch();
  const labelRef = useRef<HTMLLabelElement>(null);
  const handleOptionClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleExport = useCallback(async () => {
    await exportCurrentStore();
    onClose();
  }, [onClose]);

  const handleImport = useCallback(
    async (event: SyntheticEvent<HTMLInputElement>) => {
      onClose();
      if (event.currentTarget.files) {
        const storeFile = event.currentTarget.files[0];
        const storeData = await importStore(storeFile);
        dispatch(storeThunkActions.restoreFromFileData(storeData));
      }
    },
    [dispatch, onClose]
  );

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
      <MenuItem onClick={() => labelRef.current?.click()}>
        <ListItemText>
          <StyledLabel ref={labelRef} onClick={(e) => e.stopPropagation()}>
            Import <small>(json)</small>
            <StyledInputFile
              type="file"
              accept="application/json"
              onChange={handleImport}
            />
          </StyledLabel>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};
