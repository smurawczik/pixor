import { useCallback } from "react";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasThunkActions } from "../../../redux/canvas/canvas.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UseToolBaseParams } from "../canvas.tools.types";

interface UseBlurToolParams extends UseToolBaseParams {}

export const useBlurTool = ({ canvasContext }: UseBlurToolParams) => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector(canvasSelectors.coordinates);
  const color = useAppSelector(canvasSelectors.currentColor);

  const blurPixelInCanvas = useCallback(() => {
    const { x, y } = coordinates;
    if (canvasContext && x && y) {
      dispatch(
        canvasThunkActions.blur({
          canvasContext,
          x,
          y,
          color,
        })
      );
    }
  }, [canvasContext, color, coordinates, dispatch]);

  return { blurPixelInCanvas };
};
