import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { AppDispatch, RootState } from "./../store";
import { CANVAS_DIMENSION_MULTIPLIER } from "./canvas.constants";
import {
  drawPixelInCanvas,
  erasePixelFromCanvas,
  bucketPaintInCanvas,
} from "./canvas.helpers";
import { canvasActions } from "./canvas.slice";
import type {
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

export const canvasThunkActions = {
  draw,
  erase,
  bucket,
};
