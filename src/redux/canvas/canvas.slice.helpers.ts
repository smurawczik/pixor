import { PayloadAction } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import {
  FrameNumberToSelect,
  FrameToSelect,
} from "../animation/animation.types";
import { CANVAS_TRANSPARENT_COLOR } from "./canvas.constants";
import { generateNbyMObjectMatrix } from "./canvas.helpers";
import {
  CanvasCoords,
  CanvasPixelData,
  CanvasSliceState,
  DrawCanvasPixelData,
} from "./canvas.types";

export const lineMoving = (
  state: CanvasSliceState,
  action: PayloadAction<
    Required<CanvasCoords> & {
      canvasPixelData: CanvasPixelData;
    },
    string,
    {
      arg: DrawCanvasPixelData;
      requestId: string;
      requestStatus: "fulfilled";
    },
    never
  >
) => {
  state.canvasPixelData = action.payload.canvasPixelData;

  if (state.drawingLineData) {
    const { start } = state.drawingLineData;
    const { x, y } = action.payload;
    const slope = Math.abs((y - start.y) / (x - start.x));
    state.drawingLineData = {
      ...state.drawingLineData,
      end: {
        x,
        y,
      },
      slope,
    };
  }
};

export const blurPixel = (
  canvasPixelData: CanvasPixelData,
  pixelColor: string,
  x: number,
  y: number
) => {
  if (!pixelColor || pixelColor === CANVAS_TRANSPARENT_COLOR)
    return canvasPixelData;

  const followingPixelCoordinate = canvasPixelData?.[x]?.[y];
  if (!followingPixelCoordinate) return canvasPixelData;

  const followingPixelColor = followingPixelCoordinate?.color;
  if (
    !followingPixelColor ||
    followingPixelColor === CANVAS_TRANSPARENT_COLOR
  ) {
    const nextColor = chroma.mix(pixelColor, "white", 0.1).css();

    canvasPixelData[x][y] = {
      color: nextColor,
    };

    return canvasPixelData;
  }

  const nextColor = chroma.mix(pixelColor, followingPixelColor).css();

  canvasPixelData[x][y] = {
    color: nextColor,
  };

  return canvasPixelData;
};

export const frameSelectionInCanvas = (
  state: CanvasSliceState,
  action: PayloadAction<
    FrameToSelect,
    string,
    {
      arg: FrameNumberToSelect;
      requestId: string;
      requestStatus: "fulfilled";
    },
    never
  >
) => {
  const newCanvasMatrix = generateNbyMObjectMatrix(
    state.size.width,
    state.size.height
  );

  const { pixelData } = action.payload.frameToSelect;

  Object.keys(pixelData).forEach((xKey) => {
    const xIndex = parseInt(xKey);
    Object.keys(pixelData[xIndex]).forEach((yKey) => {
      const yIndex = parseInt(yKey);
      if (
        pixelData?.[xIndex]?.[yIndex].color &&
        newCanvasMatrix?.[xIndex]?.[yIndex]
      ) {
        newCanvasMatrix[xIndex][yIndex].color = pixelData[xIndex][yIndex].color;
      }
    });
  });

  state.canvasPixelData = newCanvasMatrix;
};
