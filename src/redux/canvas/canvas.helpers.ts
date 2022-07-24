import { CANVAS_TRANSPARENT_COLOR } from "./canvas.constants";
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

export const drawPixelInCanvas = (
  canvasContext: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  pixelMultiplier: number
) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(
    (x - 1) * pixelMultiplier,
    (y - 1) * pixelMultiplier,
    pixelMultiplier,
    pixelMultiplier
  );
};

export const erasePixelFromCanvas = (
  canvasContext: CanvasRenderingContext2D,
  x: number,
  y: number,
  pixelMultiplier: number
) => {
  canvasContext.clearRect(
    (x - 1) * pixelMultiplier,
    (y - 1) * pixelMultiplier,
    pixelMultiplier,
    pixelMultiplier
  );
};

export const bucketPaintInCanvas = (
  x: number,
  y: number,
  size: CanvasSize,
  clonedCanvasPixelData: CanvasPixelData,
  color: string,
  canvasContext: CanvasRenderingContext2D,
  pixelMultiplier: number
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

  canvasContext.fillStyle = color;

  Object.keys(clonedCanvasPixelData).forEach((xKey) => {
    const xIndex = parseInt(xKey);
    Object.keys(clonedCanvasPixelData[xIndex]).forEach((yKey) => {
      const yIndex = parseInt(yKey);

      if (clonedCanvasPixelData[xIndex][yIndex].color === color) {
        canvasContext.fillRect(
          (xIndex - 1) * pixelMultiplier,
          (yIndex - 1) * pixelMultiplier,
          pixelMultiplier,
          pixelMultiplier
        );
      }
    });
  });

  return clonedCanvasPixelData;
};
