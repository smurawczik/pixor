import Button from "@mui/material/Button";
import { SyntheticEvent, useState } from "react";
import { FileMenuOptions } from "./FileMenu.Options";

export const FileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        disableElevation
        onClick={handleClick}
        color="secondary"
      >
        File
      </Button>
      <FileMenuOptions onClose={handleClose} open={open} anchorEl={anchorEl} />
    </div>
  );
};
