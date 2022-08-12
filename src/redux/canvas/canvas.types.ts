import { AsyncThunk } from "@reduxjs/toolkit";

export type CanvasSize = {
  width: number;
  height: number;
};

export type CanvasCoords = {
  x?: number;
  y?: number;
};

export type CanvasPalette = {
  currentColor: string;
  allColors: string[];
};

export type PixelData = {
  color: string;
  lineLayerColor?: string;
};

export type CanvasPixelData = Record<number, Record<number, PixelData>>;

export type DrawingLineData = {
  start: Required<CanvasCoords>;
  end: Required<CanvasCoords>;
  slope: number;
};

export interface CanvasSliceState {
  size: CanvasSize;
  pixelSize: CanvasSize;
  coords: CanvasCoords;
  palette: CanvasPalette;
  canvasPixelData: CanvasPixelData;
  drawingLineData?: DrawingLineData;
}

export type DrawCanvasPixelData = {
  x: number;
  y: number;
  color: string;
  canvasContext: CanvasRenderingContext2D;
};

export type DrawCanvasPixelDataReturnValue = Omit<
  DrawCanvasPixelData,
  "canvasContext"
>;

export type EraseCanvasPixelData = Omit<DrawCanvasPixelData, "color">;
export type EraseCanvasPixelDataReturnValue = Omit<
  EraseCanvasPixelData,
  "canvasContext"
>;

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
