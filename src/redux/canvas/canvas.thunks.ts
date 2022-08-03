import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { AppDispatch, RootState } from "./../store";
import {
  CANVAS_DIMENSION_MULTIPLIER,
  CANVAS_TRANSPARENT_COLOR,
} from "./canvas.constants";
import {
  bucketPaintInCanvas,
  drawPixelInCanvas,
  erasePixelFromCanvas,
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

  const clonedCanvasPixelData = cloneDeep<CanvasPixelData>(canvasPixelData);

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
  Required<CanvasCoords> & { canvasPixelData: CanvasPixelData },
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("lineMove", (newPixelData: DrawCanvasPixelData, reduxApi) => {
  const { x, y, canvasContext, color } = newPixelData;

  const { drawingLineData, canvasPixelData } =
    reduxApi.getState().canvasReducer;
  const clonedCanvasPixelData = cloneDeep<CanvasPixelData>(canvasPixelData);

  if (drawingLineData) {
    const { x: startX, y: startY } = drawingLineData.start;

    const points = linePoints({ x: startX, y: startY }, { x, y });

    // remove previous lineLayerColor
    Object.keys(clonedCanvasPixelData).forEach((xKey) => {
      const xIndex = parseInt(xKey);
      Object.keys(clonedCanvasPixelData[xIndex]).forEach((yKey) => {
        const yIndex = parseInt(yKey);
        if (clonedCanvasPixelData[xIndex][yIndex].lineLayerColor) {
          delete clonedCanvasPixelData[xIndex][yIndex].lineLayerColor;
        }

        if (
          clonedCanvasPixelData[xIndex][yIndex].color ===
          CANVAS_TRANSPARENT_COLOR
        ) {
          erasePixelFromCanvas(
            canvasContext,
            xIndex,
            yIndex,
            CANVAS_DIMENSION_MULTIPLIER
          );
        } else {
          drawPixelInCanvas(
            canvasContext,
            xIndex,
            yIndex,
            clonedCanvasPixelData[xIndex][yIndex].color,
            CANVAS_DIMENSION_MULTIPLIER
          );
        }
      });
    });

    // add line layer colors in clonedCanvasPixelData
    points.forEach((point) => {
      clonedCanvasPixelData[point.x][point.y].lineLayerColor = color;
    });

    // remove previous lineLayerColor
    Object.keys(clonedCanvasPixelData).forEach((xKey) => {
      const xIndex = parseInt(xKey);
      Object.keys(clonedCanvasPixelData[xIndex]).forEach((yKey) => {
        const yIndex = parseInt(yKey);
        if (clonedCanvasPixelData[xIndex][yIndex].lineLayerColor) {
          canvasContext.fillStyle = color;
          canvasContext.fillRect(
            (xIndex - 1) * CANVAS_DIMENSION_MULTIPLIER,
            (yIndex - 1) * CANVAS_DIMENSION_MULTIPLIER,
            CANVAS_DIMENSION_MULTIPLIER,
            CANVAS_DIMENSION_MULTIPLIER
          );
        }
      });
    });
  }

  return { x, y, canvasPixelData: clonedCanvasPixelData };
});

const lineEnd = createAsyncThunk<
  Required<CanvasCoords> & { canvasPixelData: CanvasPixelData },
  DrawCanvasPixelData,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("lineEnd", (newPixelData: DrawCanvasPixelData, reduxApi) => {
  const { x, y, canvasContext, color } = newPixelData;

  const { drawingLineData, canvasPixelData } =
    reduxApi.getState().canvasReducer;

  const clonedCanvasPixelData = cloneDeep(canvasPixelData);

  if (drawingLineData) {
    const { x: startX, y: startY } = drawingLineData.start;

    canvasContext.fillStyle = color;

    const points = linePoints({ x: startX, y: startY }, { x, y });

    points.forEach((point) => {
      canvasContext.fillRect(
        (point.x - 1) * CANVAS_DIMENSION_MULTIPLIER,
        (point.y - 1) * CANVAS_DIMENSION_MULTIPLIER,
        CANVAS_DIMENSION_MULTIPLIER,
        CANVAS_DIMENSION_MULTIPLIER
      );
      delete clonedCanvasPixelData[point.x][point.y].lineLayerColor;
      clonedCanvasPixelData[point.x][point.y].color = color;
    });
  }

  return { x, y, canvasPixelData: clonedCanvasPixelData };
});

export const canvasThunkActions = {
  draw,
  erase,
  bucket,
  lineStart,
  lineMove,
  lineEnd,
};
