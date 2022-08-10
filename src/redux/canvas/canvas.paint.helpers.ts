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
