import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { AppDispatch, RootState } from "./../store";
import { CANVAS_DIMENSION_MULTIPLIER } from "./canvas.constants";
import { floodFill } from "./canvas.helpers";
import { CanvasPixelData } from "./canvas.types";

type DrawCanvasPixelData = {
  x: number;
  y: number;
  color: string;
  canvasContext: CanvasRenderingContext2D;
};

type DrawCanvasPixelDataReturnValue = Omit<
  DrawCanvasPixelData,
  "canvasContext"
>;

const draw = createAsyncThunk<
  DrawCanvasPixelDataReturnValue,
  DrawCanvasPixelData
>("drawInCanvas", (canvasPixelData: DrawCanvasPixelData) => {
  const { x, y, color, canvasContext } = canvasPixelData;

  canvasContext.fillStyle = color;
  canvasContext.fillRect(
    (x - 1) * CANVAS_DIMENSION_MULTIPLIER,
    (y - 1) * CANVAS_DIMENSION_MULTIPLIER,
    CANVAS_DIMENSION_MULTIPLIER,
    CANVAS_DIMENSION_MULTIPLIER
  );

  return {
    x,
    y,
    color,
  };
});

type EraseCanvasPixelData = Omit<DrawCanvasPixelData, "color">;
type EraseCanvasPixelDataReturnValue = Omit<
  EraseCanvasPixelData,
  "canvasContext"
>;

const erase = createAsyncThunk<
  EraseCanvasPixelDataReturnValue,
  EraseCanvasPixelData
>("eraseFromCanvas", (canvasPixelData: EraseCanvasPixelData) => {
  const { x, y, canvasContext } = canvasPixelData;

  canvasContext.clearRect(
    (x - 1) * CANVAS_DIMENSION_MULTIPLIER,
    (y - 1) * CANVAS_DIMENSION_MULTIPLIER,
    CANVAS_DIMENSION_MULTIPLIER,
    CANVAS_DIMENSION_MULTIPLIER
  );

  return { x, y };
});

const bucket = createAsyncThunk<
  CanvasPixelData,
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("paintWithBucket", (newPixelData: DrawCanvasPixelData, reduxApi) => {
  const { x, y, canvasContext, color } = newPixelData;

  const { canvasPixelData, size } = reduxApi.getState().canvasReducer;

  const clonedCanvasPixelData = cloneDeep(canvasPixelData);

  floodFill(
    x,
    y,
    size.width,
    size.height,
    clonedCanvasPixelData,
    clonedCanvasPixelData?.[x]?.[y]?.color,
    color
  );

  canvasContext.fillStyle = color;

  Object.keys(clonedCanvasPixelData).forEach((xKey) => {
    const xIndex = parseInt(xKey);
    Object.keys(clonedCanvasPixelData[xIndex]).forEach((yKey) => {
      const yIndex = parseInt(yKey);

      if (clonedCanvasPixelData[xIndex][yIndex].color === color) {
        canvasContext.fillRect(
          (xIndex - 1) * CANVAS_DIMENSION_MULTIPLIER,
          (yIndex - 1) * CANVAS_DIMENSION_MULTIPLIER,
          CANVAS_DIMENSION_MULTIPLIER,
          CANVAS_DIMENSION_MULTIPLIER
        );
      }
    });
  });

  return clonedCanvasPixelData;
});

export const canvasThunkActions = {
  draw,
  erase,
  bucket,
};
