import { Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { CANVAS_TRANSPARENT_COLOR } from "../../../redux/canvas/canvas.constants";
import {
  clearAllCanvas,
  drawPixelInCanvas,
} from "../../../redux/canvas/canvas.paint.helpers";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { CanvasDownloadSize } from "../../../redux/canvas/canvas.types";
import { useAppSelector } from "../../../redux/hooks";
import { CanvasPreviewDownload } from "./CanvasPreviewDownload";
import { CanvasPreviewDownloadOptions } from "./CanvasPreviewDownloadOptions";

const StyledCanvas = styled.canvas`
  z-index: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

export const CanvasPreview = () => {
  const canvasPixelData = useAppSelector(canvasSelectors.getPixelData);
  const canvasDimensions = useAppSelector(canvasSelectors.dimensions);
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);
  const [downloadOption, setDownloadOption] = useState<CanvasDownloadSize>(
    CanvasDownloadSize.ORIGINAL
  );

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const CANVAS_PREVIEW_MULTIPLIER = isLargeScreen ? 3 : 2;

  const onDownloadOptionChange = useCallback((option: CanvasDownloadSize) => {
    setDownloadOption(option);
  }, []);

  const debounceDrawingInCanvas = useRef(
    debounce((pixelData) => {
      if (previewCanvasRef.current) {
        const previewCanvasContext = previewCanvasRef.current.getContext("2d");

        if (previewCanvasContext) {
          clearAllCanvas(previewCanvasRef.current, previewCanvasContext);

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
    }, 250)
  ).current;

  useEffect(() => {
    debounceDrawingInCanvas(canvasPixelData);
  }, [canvasPixelData, debounceDrawingInCanvas]);

  return (
    <Box display="flex" flexDirection="column">
      <Typography gutterBottom variant="h6" sx={{ mt: 2, alignSelf: "start" }}>
        Preview
      </Typography>
      <Box border="1px solid black" display="inline-flex">
        <StyledCanvas
          ref={previewCanvasRef}
          width={canvasDimensions.width * CANVAS_PREVIEW_MULTIPLIER}
          height={canvasDimensions.height * CANVAS_PREVIEW_MULTIPLIER}
        ></StyledCanvas>
      </Box>
      <CanvasPreviewDownloadOptions
        onDownloadOptionChange={onDownloadOptionChange}
      />
      <CanvasPreviewDownload downloadOption={downloadOption} />
    </Box>
  );
};
