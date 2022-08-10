import { IconButton } from "@mui/material";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { AnimationPlayState } from "../../../redux/animation/animation.types";
import { animationActions } from "../../../redux/animation/animation.slice";
import { useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";

export const PlayPause = () => {
  const dispatch = useAppDispatch();
  const playState = useAppSelector(animationSelectors.playState);

  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);

  return playState === AnimationPlayState.PLAYING ? (
    <IconButton
      color="primary"
      onClick={() =>
        dispatch(animationActions.setPlayState(AnimationPlayState.PAUSED))
      }
    >
      <PauseCircleFilledIcon fontSize={isLargeScreen ? "large" : "medium"} />
    </IconButton>
  ) : (
    <IconButton
      color="primary"
      onClick={() =>
        dispatch(animationActions.setPlayState(AnimationPlayState.PLAYING))
      }
    >
      <PlayCircleFilledIcon fontSize={isLargeScreen ? "large" : "medium"} />
    </IconButton>
  );
};
