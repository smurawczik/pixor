import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { animationThunkActions } from "../../../redux/animation/animation.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export const DuplicateFrameButton = () => {
  const dispatch = useAppDispatch();
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);
  const selectedFrame = useAppSelector(animationSelectors.selectedFrame);

  return (
    <Tooltip title="Duplicate Frame">
      <IconButton
        color="primary"
        sx={{ mr: 1 }}
        onClick={() =>
          dispatch(
            animationThunkActions.duplicateFrame({
              frameNumberToDuplicate: selectedFrame,
            })
          )
        }
      >
        <ContentCopyIcon fontSize={isLargeScreen ? "large" : "medium"} />
      </IconButton>
    </Tooltip>
  );
};
