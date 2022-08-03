import { useCallback } from "react";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasThunkActions } from "../../../redux/canvas/canvas.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UseToolBaseParams } from "../canvas.tools.types";

interface UseEraseToolParams extends UseToolBaseParams {}

export const useEraseTool = ({ canvasContext }: UseEraseToolParams) => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector(canvasSelectors.coordinates);

  const eraseFromCanvas = useCallback(() => {
    const { x, y } = coordinates;
    if (canvasContext && x && y) {
      dispatch(
        canvasThunkActions.erase({
          canvasContext,
          x,
          y,
        })
      );
    }
  }, [canvasContext, coordinates, dispatch]);

  return { eraseFromCanvas };
};
