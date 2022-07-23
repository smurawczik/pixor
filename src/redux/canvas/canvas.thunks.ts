import { CanvasSliceState } from "./canvas.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeCanvasPixelDataKey } from "./canvas.helpers";
import { CANVAS_DIMENSION_MULTIPLIER } from "./canvas.constants";

type DrawCanvasPixelData = {
  x: number;
  y: number;
  color: string;
  canvasContext: CanvasRenderingContext2D;
};

const draw = createAsyncThunk<
  CanvasSliceState["canvasPixelData"],
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

  const pixelData: CanvasSliceState["canvasPixelData"] = {
    [makeCanvasPixelDataKey(x, y)]: { color },
  };
  return pixelData;
});

type EraseCanvasPixelData = Omit<DrawCanvasPixelData, "color">;

const erase = createAsyncThunk<string, EraseCanvasPixelData>(
  "eraseFromCanvas",
  (canvasPixelData: EraseCanvasPixelData) => {
    const { x, y, canvasContext } = canvasPixelData;

    canvasContext.clearRect(
      (x - 1) * CANVAS_DIMENSION_MULTIPLIER,
      (y - 1) * CANVAS_DIMENSION_MULTIPLIER,
      CANVAS_DIMENSION_MULTIPLIER,
      CANVAS_DIMENSION_MULTIPLIER
    );

    return makeCanvasPixelDataKey(x, y);
  }
);

const bucket = createAsyncThunk<string, EraseCanvasPixelData>(
  "paintWithBucket",
  (canvasPixelData: EraseCanvasPixelData) => {
    const { x, y, canvasContext } = canvasPixelData;

    return makeCanvasPixelDataKey(x, y);
  }
);

export const canvasThunkActions = {
  draw,
  erase,
  bucket,
};
