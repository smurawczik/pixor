import { CANVAS_TRANSPARENT_COLOR } from "./canvas.constants";
import { CanvasSize, CanvasSliceState } from "./canvas.types";

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
    Math.ceil((x * fakeDimensions.width) / dimensions.width),
    1
  );
  const yCoord = Math.max(
    Math.ceil((y * fakeDimensions.height) / dimensions.height),
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
