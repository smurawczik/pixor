import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useMedia } from "react-use";
import { CANVAS_TRANSPARENT_COLOR } from "../../redux/canvas/canvas.constants";
import { drawPixelInCanvas } from "../../redux/canvas/canvas.helpers";
import { canvasSelectors } from "../../redux/canvas/canvas.selectors";
import { useAppSelector } from "../../redux/hooks";

export const CanvasPreview = () => {
  const canvasPixelData = useAppSelector(canvasSelectors.getPixelData);
  const canvasDimensions = useAppSelector(canvasSelectors.dimensions);
  const isLargeScreen = useMedia("(min-width: 1280px)");

  const CANVAS_PREVIEW_MULTIPLIER = isLargeScreen ? 5 : 2.5;

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (previewCanvasRef.current) {
      const previewCanvasContext = previewCanvasRef.current.getContext("2d");

      if (previewCanvasContext) {
        Object.keys(canvasPixelData).forEach((x) => {
          const intX = parseInt(x);
          Object.keys(canvasPixelData[intX]).forEach((y) => {
            const intY = parseInt(y);
            const currentColorInCoordinate =
              canvasPixelData[intX]?.[intY]?.color;
            if (currentColorInCoordinate !== CANVAS_TRANSPARENT_COLOR) {
              drawPixelInCanvas(
                previewCanvasContext,
                intX,
                intY,
                currentColorInCoordinate,
                CANVAS_PREVIEW_MULTIPLIER
              );
            }
          });
        });
      }
    }
  }, [CANVAS_PREVIEW_MULTIPLIER, canvasPixelData]);

  return (
    <div>
      <Typography gutterBottom variant="h6" sx={{ mt: 2, alignSelf: "start" }}>
        Preview
      </Typography>
      <Box border="1px solid black" display="flex">
        <canvas
          ref={previewCanvasRef}
          width={canvasDimensions.width * CANVAS_PREVIEW_MULTIPLIER}
          height={canvasDimensions.height * CANVAS_PREVIEW_MULTIPLIER}
        ></canvas>
      </Box>
    </div>
  );
};
