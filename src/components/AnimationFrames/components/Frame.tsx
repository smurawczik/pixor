import { Box } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { AnimationFrame } from "../../../redux/animation/animation.types";
import { CANVAS_TRANSPARENT_COLOR } from "../../../redux/canvas/canvas.constants";
import { drawPixelInCanvas } from "../../../redux/canvas/canvas.helpers";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { useAppSelector } from "../../../redux/hooks";

const StyledCanvas = styled.canvas`
  z-index: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

export const Frame: FC<{ frame: AnimationFrame }> = ({ frame }) => {
  const { index, pixelData } = frame;
  const isFrameSelected = useAppSelector(
    animationSelectors.isFrameSelected(index)
  );
  const canvasDimensions = useAppSelector(canvasSelectors.dimensions);
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);

  const CANVAS_PREVIEW_MULTIPLIER = isLargeScreen ? 2.5 : 1.25;

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (previewCanvasRef.current) {
      const previewCanvasContext = previewCanvasRef.current.getContext("2d");

      if (previewCanvasContext) {
        Object.keys(pixelData).forEach((x) => {
          const intX = parseInt(x);
          Object.keys(pixelData[intX]).forEach((y) => {
            const intY = parseInt(y);
            const currentColorInCoordinate = pixelData[intX]?.[intY]?.color;
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
  }, [CANVAS_PREVIEW_MULTIPLIER, pixelData]);

  return (
    <Box
      border={isFrameSelected ? "2px solid purple" : "1px solid black"}
      display="inline-flex"
    >
      <StyledCanvas
        ref={previewCanvasRef}
        width={canvasDimensions.width * CANVAS_PREVIEW_MULTIPLIER}
        height={canvasDimensions.height * CANVAS_PREVIEW_MULTIPLIER}
      ></StyledCanvas>
    </Box>
  );
};
