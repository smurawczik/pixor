import {
  CANVAS_SCALE_FACTOR,
  CANVAS_TRANSPARENT_COLOR,
} from "./canvas.constants";
import { CanvasPixelData, CanvasSize, CanvasSliceState } from "./canvas.types";

// @coordinates
export const calculateNewCoordinates = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  fakeDimensions: CanvasSize,
  dimensions: CanvasSize
) => {
  const rect = canvasRef.current!.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xCoord = Math.max(
    Math.ceil(
      (x * fakeDimensions.width) / dimensions.width / CANVAS_SCALE_FACTOR
    ),
    1
  );
  const yCoord = Math.max(
    Math.ceil(
      (y * fakeDimensions.height) / dimensions.height / CANVAS_SCALE_FACTOR
    ),
    1
  );
  return { xCoord, yCoord };
};

export const generateNbyMObjectMatrix = (n: number, m: number) => {
  const matrix: CanvasSliceState["canvasPixelData"] = {};
  for (let i = 1; i < n + 1; i++) {
    if (!matrix[i]) matrix[i] = {};
    for (let j = 1; j < m + 1; j++) {
      if (!matrix[i][j]) matrix[i][j] = { color: CANVAS_TRANSPARENT_COLOR };
    }
  }
  return matrix;
};

export const floodFill = (
  x: number,
  y: number,
  xMax: number,
  yMax: number,
  matrix: CanvasSliceState["canvasPixelData"],
  previousColor: string,
  nextColor: string
) => {
  // Check the boundary condition
  // console.log({ x, y, previousColor, nextColor });
  if (x < 1 || x > xMax || y < 1 || y > yMax) return;
  if (matrix[x][y].color !== previousColor) return;

  // set the color of node to newColor
  matrix[x][y].color = nextColor;

  // Look for neighboring cell
  floodFill(x + 1, y, xMax, yMax, matrix, previousColor, nextColor);
  floodFill(x - 1, y, xMax, yMax, matrix, previousColor, nextColor);
  floodFill(x, y + 1, xMax, yMax, matrix, previousColor, nextColor);
  floodFill(x, y - 1, xMax, yMax, matrix, previousColor, nextColor);
};

export const bucketPaintInCanvas = (
  x: number,
  y: number,
  size: CanvasSize,
  clonedCanvasPixelData: CanvasPixelData,
  color: string
) => {
  floodFill(
    x,
    y,
    size.width,
    size.height,
    clonedCanvasPixelData,
    clonedCanvasPixelData?.[x]?.[y]?.color,
    color
  );

  return clonedCanvasPixelData;
};

class Point {
  x: any;
  y: any;
  constructor(x: any, y: any) {
    this.x = x;
    this.y = y;
  }
  equals(point: { x: any; y: any }) {
    return this.x === point.x && this.y === point.y;
  }
}

export const linePoints = (p1: any, p2: any) => {
  /* this function calculates the points of the line with endpoints p1 &p2
   */
  let points = [];
  let dx = Math.abs(p2.x - p1.x);
  let sx = p1.x < p2.x ? 1 : -1;
  let dy = -Math.abs(p2.y - p1.y);
  let sy = p1.y < p2.y ? 1 : -1;
  let err = dx + dy;

  let x1 = p1.x;
  let y1 = p1.y;
  while (true) {
    points.push(new Point(x1, y1));
    if (x1 === p2.x && y1 === p2.y) {
      break;
    }
    let e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x1 += sx;
    }

    if (e2 <= dx) {
      err += dx;
      y1 += sy;
    }
  }
  return points;
};
