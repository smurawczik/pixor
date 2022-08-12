import { useCallback, useRef } from "react";

export const usePenTool = () => {
  const isMouseDownRef = useRef(false);

  const putPenDown = useCallback(() => {
    isMouseDownRef.current = true;
  }, []);

  const isPenDown = useCallback(() => {
    return isMouseDownRef.current;
  }, []);

  const putPenUp = useCallback(() => {
    isMouseDownRef.current = false;
  }, []);

  return { isPenDown, putPenDown, putPenUp };
};
