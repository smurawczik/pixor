import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { IconButton } from "@mui/material";
import { useInterval, useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { animationActions } from "../../../redux/animation/animation.slice";
import { animationThunkActions } from "../../../redux/animation/animation.thunks";
import { AnimationPlayState } from "../../../redux/animation/animation.types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export const PlayPause = () => {
  const dispatch = useAppDispatch();
  const playState = useAppSelector(animationSelectors.playState);
  const currentFrame = useAppSelector(animationSelectors.selectedFrame);

  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);

  useInterval(
    () => {
      dispatch(
        animationThunkActions.selectNextFrame({
          frameNumberToSelect: currentFrame + 1,
        })
      );
    },
    playState === AnimationPlayState.PLAYING ? 500 : null
  );

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
