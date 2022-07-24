import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { calculateNewCoordinates } from "../../../redux/canvas/canvas.helpers";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../../redux/canvas/canvas.slice";
import { canvasThunkActions } from "../../../redux/canvas/canvas.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toolsSelectors } from "../../../redux/tools/tools.selectors";
import { ToolsEnum } from "../../../redux/tools/tools.types";

const StyledCanvas = styled.canvas`
  z-index: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

export const CanvasElement = () => {
  const isMouseDownRef = useRef(false);
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensions = useAppSelector(canvasSelectors.pixelDimensions);
  const fakeDimensions = useAppSelector(canvasSelectors.dimensions);
  const coordinates = useAppSelector(canvasSelectors.coordinates);
  const currentColor = useAppSelector(canvasSelectors.currentColor);
  const currentTool = useAppSelector(toolsSelectors.getCurrentTool);

  const setNewCoordinates = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (canvasRef.current) {
        const { xCoord, yCoord } = calculateNewCoordinates(
          canvasRef,
          event,
          fakeDimensions,
          dimensions
        );
        if (xCoord !== coordinates.x || yCoord !== coordinates.y) {
          dispatch(canvasActions.setCoords({ x: xCoord, y: yCoord }));
        }
      }
    },
    [coordinates.x, coordinates.y, dimensions, dispatch, fakeDimensions]
  );

  const throttleSettingCoordinates = useMemo(
    () => throttle(setNewCoordinates, 15),
    [setNewCoordinates]
  );

  const canvasAction = useCallback(
    (isClicking?: boolean) => {
      const canvasContext = canvasRef.current?.getContext("2d");
      const { x, y } = coordinates;
      if (canvasContext && x && y) {
        if (isMouseDownRef.current || isClicking) {
          switch (currentTool) {
            case ToolsEnum.PENCIL:
              dispatch(
                canvasThunkActions.draw({
                  canvasContext,
                  x,
                  y,
                  color: currentColor,
                })
              );
              break;
            case ToolsEnum.ERASER:
              dispatch(
                canvasThunkActions.erase({
                  canvasContext,
                  x,
                  y,
                })
              );
              break;
            case ToolsEnum.BUCKET:
              dispatch(
                canvasThunkActions.bucket({
                  canvasContext,
                  x,
                  y,
                  color: currentColor,
                })
              );
              break;
          }
        }
      }
    },
    [coordinates, currentColor, currentTool, dispatch]
  );

  const throttleCanvasAction = useMemo(
    () => throttle(canvasAction, 15),
    [canvasAction]
  );

  const resetCoordinates = useCallback(() => {
    dispatch(canvasActions.setCoords({}));
  }, [dispatch]);

  const mouseIsDown = useCallback(() => {
    isMouseDownRef.current = true;
  }, []);

  const mouseIsUp = useCallback(() => {
    isMouseDownRef.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", mouseIsUp);
    return () => {
      document.removeEventListener("mouseup", mouseIsUp);
    };
  }, [mouseIsUp]);

  return (
    <StyledCanvas
      width={dimensions.width}
      height={dimensions.height}
      id="canvas"
      onMouseMove={(event) => {
        throttleSettingCoordinates(event);
        throttleCanvasAction();
      }}
      onClick={() => {
        canvasAction(true);
      }}
      onMouseOut={resetCoordinates}
      onMouseDown={mouseIsDown}
      onMouseUp={mouseIsUp}
      ref={canvasRef}
    />
  );
};
