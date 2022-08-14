import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { CanvasDownloadSize } from "../../redux/canvas/canvas.types";

export const CanvasPreviewDownload: FC<{
  dataURL: string;
  downloadOption: CanvasDownloadSize;
}> = ({ dataURL }) => {
  const onDownload = useCallback(() => {
    var a = document.createElement("a");
    a.href = dataURL;
    a.download = "preview.png";
    document.body.appendChild(a);
    a.click();
  }, [dataURL]);

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
    </Button>
  );
};
