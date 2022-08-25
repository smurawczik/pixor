import Button from "@mui/material/Button";
import React, { FC, SyntheticEvent, useState } from "react";

export const GenericMenu: FC<{
  name: string;
  MenuListComponent: FC<{
    onClose: () => void;
    open: boolean;
    anchorEl: HTMLElement | null;
  }>;
}> = ({ name, MenuListComponent }) => {
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
        size="small"
        disableElevation
        onClick={handleClick}
        color="primary"
      >
        {name}
      </Button>
      <MenuListComponent
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
      />
    </div>
  );
};
