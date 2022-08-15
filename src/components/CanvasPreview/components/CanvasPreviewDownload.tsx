import { Button, CircularProgress } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useCanvasElementContext } from "../../../context/canvas";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { CanvasDownloadSize } from "../../../redux/canvas/canvas.types";
import { useAppSelector } from "../../../redux/hooks";
import { downloadImage } from "../helpers/export.helpers";

export const CanvasPreviewDownload: FC<{
  downloadOption: CanvasDownloadSize;
}> = ({ downloadOption }) => {
  const canvasDimensions = useAppSelector(canvasSelectors.dimensions);
  const [isImageDownloading, setIsImageDownloading] = useState(false);
  const { state } = useCanvasElementContext();
  const { canvasElement } = state;

  const onDownload = useCallback(() => {
    setIsImageDownloading(true);
    downloadImage(canvasElement, downloadOption, canvasDimensions).finally(
      () => {
        setTimeout(() => {
          setIsImageDownloading(false);
        }, 1000);
      }
    );
  }, [canvasDimensions, canvasElement, downloadOption]);

  return (
    <Button
      variant="contained"
      size="small"
      disableElevation
      color="secondary"
      sx={{ mt: 1 }}
      onClick={onDownload}
    >
      Download
      {isImageDownloading && <CircularProgress size={18} sx={{ ml: 1.5 }} />}
    </Button>
  );
};
