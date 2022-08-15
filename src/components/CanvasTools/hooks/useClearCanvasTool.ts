import { canvasThunkActions } from "./../../../redux/canvas/canvas.thunks";
import { useAppDispatch } from "./../../../redux/hooks";
import { useCallback } from "react";
import { UseToolBaseParams } from "../canvas.tools.types";

interface UseEraseToolParams extends UseToolBaseParams {}

export const useClearCanvasTool = ({ canvasContext }: UseEraseToolParams) => {
  const dispatch = useAppDispatch();
  const clearCanvas = useCallback(() => {
    if (canvasContext) {
      canvasContext.clearRect(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height
      );
      dispatch(canvasThunkActions.clearCanvas());
    }
  }, [canvasContext, dispatch]);

  return { clearCanvas };
};
