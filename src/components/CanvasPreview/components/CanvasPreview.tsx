import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { useCanvasElementContext } from "../../../context/canvas";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { CanvasDownloadSize } from "../../../redux/canvas/canvas.types";
import { useAppSelector } from "../../../redux/hooks";
import { CanvasPreviewDownload } from "./CanvasPreviewDownload";
import { CanvasPreviewDownloadOptions } from "./CanvasPreviewDownloadOptions";

export const CanvasPreview = () => {
  const canvasDimensions = useAppSelector(canvasSelectors.dimensions);
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);
  const [downloadOption, setDownloadOption] = useState<CanvasDownloadSize>(
    CanvasDownloadSize.ORIGINAL
  );

  const { state } = useCanvasElementContext();
  const { dataURL } = state;

  const CANVAS_PREVIEW_MULTIPLIER = isLargeScreen ? 3 : 2;

  const onDownloadOptionChange = useCallback((option: CanvasDownloadSize) => {
    setDownloadOption(option);
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Typography gutterBottom variant="h6" sx={{ mt: 2, alignSelf: "start" }}>
        Preview
      </Typography>
      <Box border="1px solid black" display="inline-flex">
        {dataURL && (
          <img
            src={dataURL}
            width={canvasDimensions.width * CANVAS_PREVIEW_MULTIPLIER}
            height={canvasDimensions.height * CANVAS_PREVIEW_MULTIPLIER}
            alt="canvas preview"
          />
        )}
      </Box>
      <CanvasPreviewDownloadOptions
        onDownloadOptionChange={onDownloadOptionChange}
      />
      <CanvasPreviewDownload downloadOption={downloadOption} />
    </Box>
  );
};
