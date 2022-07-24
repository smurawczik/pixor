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
