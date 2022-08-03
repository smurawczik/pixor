import { PayloadAction } from "@reduxjs/toolkit";
import {
  CanvasSliceState,
  CanvasCoords,
} from "/Users/yiuriel/repositories/pixor/src/redux/canvas/canvas.types";

export const lineMoving = (
  state: CanvasSliceState,
  action: PayloadAction<
    Required<CanvasCoords> & {
      canvasPixelData: import("/Users/yiuriel/repositories/pixor/src/redux/canvas/canvas.types").CanvasPixelData;
    },
    string,
    {
      arg: import("/Users/yiuriel/repositories/pixor/src/redux/canvas/canvas.types").DrawCanvasPixelData;
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
