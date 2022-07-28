import { Button } from "@mui/material";
import { FC } from "react";

export const CanvasPreviewDownload: FC<{
  canvasElement: HTMLCanvasElement | null;
}> = ({ canvasElement }) => {
  if (!canvasElement) return null;

  const dataURL = canvasElement.toDataURL("image/png", 1);

  return (
    <Button
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
