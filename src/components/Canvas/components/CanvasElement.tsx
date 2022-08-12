import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import {
  CANVAS_DIMENSION_MULTIPLIER,
  CANVAS_TRANSPARENT_COLOR,
} from "../../../redux/canvas/canvas.constants";
import { calculateNewCoordinates } from "../../../redux/canvas/canvas.helpers";
import {
  drawPixelInCanvas,
  erasePixelFromCanvas,
} from "../../../redux/canvas/canvas.paint.helpers";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toolsSelectors } from "../../../redux/tools/tools.selectors";
import { ToolsEnum } from "../../../redux/tools/tools.types";
import { useBlurTool } from "../../CanvasTools/hooks/useBlurTool";
import { useBucketTool } from "../../CanvasTools/hooks/useBucketTool";
import { useDrawTool } from "../../CanvasTools/hooks/useDrawTool";
import { useEraseTool } from "../../CanvasTools/hooks/useEraseTool";
import { useLineTool } from "../../CanvasTools/hooks/useLineTool";
import { usePenTool } from "../../CanvasTools/hooks/usePenTool";
import { CANVAS_ELEMENT_ID } from "../canvas.constants";

const StyledCanvas = styled.canvas`
  z-index: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

export const CanvasElement = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensions = useAppSelector(canvasSelectors.pixelDimensions);
  const fakeDimensions = useAppSelector(canvasSelectors.dimensions);
  const coordinates = useAppSelector(canvasSelectors.coordinates);
  const canvasPixelData = useAppSelector(canvasSelectors.getPixelData);
  const currentTool = useAppSelector(toolsSelectors.getCurrentTool);

  const throttleDrawingInCanvas = useRef(
    throttle((pixelData) => {
      if (canvasRef.current) {
        const previewCanvasContext = canvasRef.current.getContext("2d");

        if (previewCanvasContext) {
          Object.keys(pixelData).forEach((x) => {
            const intX = parseInt(x);
            Object.keys(pixelData[intX]).forEach((y) => {
              const intY = parseInt(y);
              const currentColorInCoordinate =
                pixelData[intX]?.[intY]?.lineLayerColor ??
                pixelData[intX]?.[intY]?.color;
              if (currentColorInCoordinate !== CANVAS_TRANSPARENT_COLOR) {
                drawPixelInCanvas(
                  previewCanvasContext,
                  intX,
                  intY,
                  currentColorInCoordinate,
                  CANVAS_DIMENSION_MULTIPLIER
                );
              } else {
                erasePixelFromCanvas(
                  previewCanvasContext,
                  intX,
                  intY,
                  CANVAS_DIMENSION_MULTIPLIER
                );
              }
            });
          });
        }
      }
    }, 20)
  ).current;

  const { isPenDown, putPenUp, putPenDown } = usePenTool();

  const { onLineStart, onLineMove, onLineEnd } = useLineTool({
    canvasContext: canvasRef.current?.getContext("2d"),
    isPenDown: isPenDown(),
  });

  const { eraseFromCanvas } = useEraseTool({
    canvasContext: canvasRef.current?.getContext("2d"),
    isPenDown: isPenDown(),
  });

  const { drawInCanvas } = useDrawTool({
    canvasContext: canvasRef.current?.getContext("2d"),
    isPenDown: isPenDown(),
  });

  const { blurPixelInCanvas } = useBlurTool({
    canvasContext: canvasRef.current?.getContext("2d"),
    isPenDown: isPenDown(),
  });

  const { bucketPaint } = useBucketTool({
    canvasContext: canvasRef.current?.getContext("2d"),
    isPenDown: isPenDown(),
  });

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
      if (isPenDown() || isClicking) {
        switch (currentTool) {
          case ToolsEnum.PENCIL:
            drawInCanvas();
            break;
          case ToolsEnum.ERASER:
            eraseFromCanvas();
            break;
          case ToolsEnum.BUCKET:
            bucketPaint();
            break;
          case ToolsEnum.LINE:
            onLineMove();
            break;
          case ToolsEnum.BLUR:
            blurPixelInCanvas();
            break;
        }
      }
    },
    [
      blurPixelInCanvas,
      bucketPaint,
      currentTool,
      drawInCanvas,
      eraseFromCanvas,
      isPenDown,
      onLineMove,
    ]
  );

  const throttleCanvasAction = useMemo(
    () => throttle(canvasAction, 15),
    [canvasAction]
  );

  const resetCoordinates = useCallback(() => {
    dispatch(canvasActions.setCoords({}));
  }, [dispatch]);

  const mouseIsDown = useCallback(() => {
    putPenDown();

    if (currentTool === ToolsEnum.LINE) {
      onLineStart();
    }
  }, [currentTool, onLineStart, putPenDown]);

  const mouseIsUp = useCallback(() => {
    putPenUp();

    if (currentTool === ToolsEnum.LINE) {
      onLineEnd();
    }
  }, [currentTool, onLineEnd, putPenUp]);

  useEffect(() => {
    document.addEventListener("mouseup", mouseIsUp);
    return () => {
      document.removeEventListener("mouseup", mouseIsUp);
    };
  }, [mouseIsUp]);

  useEffect(() => {
    throttleDrawingInCanvas(canvasPixelData);
  }, [canvasPixelData, throttleDrawingInCanvas]);

  return (
    <StyledCanvas
      width={dimensions.width}
      height={dimensions.height}
      id={CANVAS_ELEMENT_ID}
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
