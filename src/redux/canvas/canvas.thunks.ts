import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { AppDispatch, RootState } from "./../store";
import { CANVAS_DIMENSION_MULTIPLIER } from "./canvas.constants";
import {
  drawPixelInCanvas,
  erasePixelFromCanvas,
  bucketPaintInCanvas,
  linePoints,
} from "./canvas.helpers";
import { canvasActions } from "./canvas.slice";
import type {
  CanvasCoords,
  CanvasPixelData,
  DrawCanvasPixelData,
  DrawCanvasPixelDataReturnValue,
  EraseCanvasPixelData,
  EraseCanvasPixelDataReturnValue,
} from "./canvas.types";

const draw = createAsyncThunk<
  DrawCanvasPixelDataReturnValue,
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("drawInCanvas", (canvasPixelData: DrawCanvasPixelData, reduxApi) => {
  const { x, y, color, canvasContext } = canvasPixelData;

  drawPixelInCanvas(canvasContext, x, y, color, CANVAS_DIMENSION_MULTIPLIER);

  reduxApi.dispatch(canvasActions.addColorToPaletteIfPossible(color));

  return {
    x,
    y,
    color,
  };
});

const erase = createAsyncThunk<
  EraseCanvasPixelDataReturnValue,
  EraseCanvasPixelData
>("eraseFromCanvas", (canvasPixelData: EraseCanvasPixelData) => {
  const { x, y, canvasContext } = canvasPixelData;

  erasePixelFromCanvas(canvasContext, x, y, CANVAS_DIMENSION_MULTIPLIER);

  return { x, y };
});

// @refactor
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

  reduxApi.dispatch(canvasActions.addColorToPaletteIfPossible(color));

  return bucketPaintInCanvas(
    x,
    y,
    size,
    clonedCanvasPixelData,
    color,
    canvasContext,
    CANVAS_DIMENSION_MULTIPLIER
  );
});

const lineStart = createAsyncThunk<
  Required<CanvasCoords>,
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("lineStart", (newPixelData: DrawCanvasPixelData, reduxApi) => {
  const { x, y, color } = newPixelData;

  reduxApi.dispatch(canvasActions.addColorToPaletteIfPossible(color));

  return { x, y };
});

const lineMove = createAsyncThunk<
  Required<CanvasCoords>,
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("lineMove", (newPixelData: DrawCanvasPixelData) => {
  const { x, y } = newPixelData;

  return { x, y };
});

const lineEnd = createAsyncThunk<
  Required<CanvasCoords>,
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("lineEnd", (newPixelData: DrawCanvasPixelData, reduxApi) => {
  const { x, y, canvasContext, color } = newPixelData;

  const canvasStore = reduxApi.getState().canvasReducer;
  if (canvasStore.drawingLineData) {
    const { x: startX, y: startY } = canvasStore.drawingLineData.start;

    canvasContext.fillStyle = color;

    const points = linePoints({ x: startX, y: startY }, { x, y });

    points.forEach((point) => {
      canvasContext.fillRect(
        (point.x - 1) * CANVAS_DIMENSION_MULTIPLIER,
        (point.y - 1) * CANVAS_DIMENSION_MULTIPLIER,
        CANVAS_DIMENSION_MULTIPLIER,
        CANVAS_DIMENSION_MULTIPLIER
      );
    });
  }

  return { x, y };
});

export const canvasThunkActions = {
  draw,
  erase,
  bucket,
  lineStart,
  lineMove,
  lineEnd,
};
