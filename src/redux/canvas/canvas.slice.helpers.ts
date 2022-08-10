import { PayloadAction } from "@reduxjs/toolkit";
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
