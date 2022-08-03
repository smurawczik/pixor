import { useCallback, useRef } from "react";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasThunkActions } from "../../../redux/canvas/canvas.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UseToolBaseParams } from "../canvas.tools.types";

interface UseDrawToolParams extends UseToolBaseParams {}

export const useDrawTool = ({ canvasContext }: UseDrawToolParams) => {
  const isMouseDownRef = useRef(false);
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector(canvasSelectors.coordinates);
  const color = useAppSelector(canvasSelectors.currentColor);

  const drawInCanvas = useCallback(() => {
    const { x, y } = coordinates;
    if (canvasContext && x && y) {
      dispatch(
        canvasThunkActions.draw({
          canvasContext,
          x,
          y,
          color,
        })
      );
    }
  }, [canvasContext, color, coordinates, dispatch]);

  const putPenDown = useCallback(() => {
    isMouseDownRef.current = true;
  }, []);

  const isPenDown = useCallback(() => {
    return isMouseDownRef.current;
  }, []);

  const putPenUp = useCallback(() => {
    isMouseDownRef.current = false;
  }, []);

  return { drawInCanvas, isPenDown, putPenDown, putPenUp };
};
