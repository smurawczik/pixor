import { CanvasSize, CanvasSliceState } from "./canvas.types";

const SEPARATOR = "|";

export const makeCanvasPixelDataKey = (x: number, y: number) =>
  `${x}${SEPARATOR}${y}`;

export const getCoordinatesFromCanvasPixelDataKey = (
  key: string
): CanvasSliceState["coords"] => {
  const xAndY = key.split(SEPARATOR);
  return { x: parseInt(xAndY[0]), y: parseInt(xAndY[1]) };
};

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
