import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, Tooltip } from "@mui/material";
import { useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { animationThunkActions } from "../../../redux/animation/animation.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export const AddFrameButton = () => {
  const dispatch = useAppDispatch();
  const selectedFrame = useAppSelector(animationSelectors.selectedFrame);
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);

  return (
    <Tooltip title="Add Frame">
      <IconButton
        color="primary"
        sx={{ mr: 1 }}
        onClick={() =>
          dispatch(
            animationThunkActions.addFrame({
              frameNumberToIncrease: selectedFrame,
            })
          )
        }
      >
        <AddCircleIcon fontSize={isLargeScreen ? "large" : "medium"} />
      </IconButton>
    </Tooltip>
  );
};
