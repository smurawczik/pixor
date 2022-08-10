import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, Tooltip } from "@mui/material";
import { useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";

export const AddFrameButton = () => {
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);

  return (
    <Tooltip title="Add Frame">
      <IconButton color="primary">
        <AddCircleIcon fontSize={isLargeScreen ? "large" : "medium"} />
      </IconButton>
    </Tooltip>
  );
};
