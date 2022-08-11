import { Button } from "@mui/material";
import { FC } from "react";

export const CanvasPreviewDownload: FC<{
  dataURL: string;
}> = ({ dataURL }) => {
  if (!dataURL) return null;

  return (
    <Button
      variant="contained"
      size="small"
      disableElevation
      color="secondary"
      sx={{ mt: 1 }}
      onClick={() => {
        var a = document.createElement("a");
        a.href = dataURL;
        a.download = "preview.png";
        document.body.appendChild(a);
        a.click();
      }}
    >
      Download
    </Button>
  );
};
