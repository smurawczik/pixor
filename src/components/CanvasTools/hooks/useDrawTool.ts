import { useCallback } from "react";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasThunkActions } from "../../../redux/canvas/canvas.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UseToolBaseParams } from "../canvas.tools.types";

interface UseDrawToolParams extends UseToolBaseParams {}

export const useDrawTool = ({ canvasContext }: UseDrawToolParams) => {
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

  return { drawInCanvas };
};
