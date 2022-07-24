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
};

export type CanvasPixelData = Record<number, Record<number, PixelData>>;

export interface CanvasSliceState {
  size: CanvasSize;
  pixelSize: CanvasSize;
  coords: CanvasCoords;
  palette: CanvasPalette;
  canvasPixelData: CanvasPixelData;
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
