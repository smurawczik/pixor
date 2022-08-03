import { UseToolBaseParams } from "./../canvas.tools.types";
import { useCallback, useRef } from "react";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasThunkActions } from "../../../redux/canvas/canvas.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

interface UseLineToolParams extends UseToolBaseParams {}

export const useLineTool = ({ canvasContext }: UseLineToolParams) => {
  const isLineStarted = useRef(false);
  const isLineMoving = useRef(false);

  const dispatch = useAppDispatch();

  const coordinates = useAppSelector(canvasSelectors.coordinates);
  const color = useAppSelector(canvasSelectors.currentColor);

  const onLineMove = useCallback(() => {
    const { x, y } = coordinates;
    if (x && y && canvasContext)
      dispatch(
        canvasThunkActions.lineMove({
          canvasContext,
          x,
          y,
          color,
        })
      ).then(() => (isLineMoving.current = true));
  }, [canvasContext, color, coordinates, dispatch]);

  const onLineStart = useCallback(() => {
    if (!isLineStarted.current) {
      const { x, y } = coordinates;
      if (canvasContext && x && y) {
        dispatch(
          canvasThunkActions.lineStart({
            canvasContext,
            x,
            y,
            color,
          })
        ).then(() => (isLineStarted.current = true));
      }
    }
  }, [canvasContext, color, coordinates, dispatch]);

  const onLineEnd = useCallback(() => {
    if (isLineMoving.current) {
      const { x, y } = coordinates;
      if (canvasContext && x && y) {
        isLineStarted.current = false;
        isLineMoving.current = false;
        dispatch(
          canvasThunkActions.lineEnd({
            canvasContext,
            x,
            y,
            color,
          })
        );
      }
    }
  }, [canvasContext, color, coordinates, dispatch]);

  return { onLineStart, onLineMove, onLineEnd };
};
