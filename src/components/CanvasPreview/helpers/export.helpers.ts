import {
  CanvasDownloadSize,
  CanvasSize,
} from "../../../redux/canvas/canvas.types";
export const getDownloadImageData = (
  canvasElement: HTMLCanvasElement | null,
  width: number,
  height: number
) => {
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");
  if (!canvasContext || !canvasElement) return "";

  canvas.style.imageRendering = "pixelated";
  canvas.width = width;
  canvas.height = height;

  canvasContext.drawImage(
    canvasElement,
    0,
    0,
    canvasElement.width,
    canvasElement.height,
    0,
    0,
    width,
    height
  );

  return canvas.toDataURL("image/png", 1);
};

const getDownloadBasedOnDownloadOption = (
  downloadOption: CanvasDownloadSize,
  sizeInPixels: CanvasSize
): { height: number; width: number } => {
  let height = 0,
    width = 0;
  switch (downloadOption) {
    case CanvasDownloadSize.ORIGINAL:
      return { height: sizeInPixels.height, width: sizeInPixels.width };
    case CanvasDownloadSize.DOUBLE:
      return { height: sizeInPixels.height * 2, width: sizeInPixels.width * 2 };
    default:
      return { height, width };
  }
};

export const downloadImage = (
  canvasElement: HTMLCanvasElement | null,
  downloadOption: CanvasDownloadSize,
  sizeInPixels: CanvasSize
) => {
  return new Promise(async (resolve, reject) => {
    const { width, height } = getDownloadBasedOnDownloadOption(
      downloadOption,
      sizeInPixels
    );

    if (!width || !height) reject();

    const imageData = getDownloadImageData(canvasElement, width, height);
    if (imageData) {
      var a = document.createElement("a");

      a.style.position = "absolute";
      a.style.left = "-9999px";
      a.style.top = "-9999px";

      a.href = imageData;

      const fileNamePrompt = await prompt(
        "Write a filename (default is preview)"
      );
      a.download = `${fileNamePrompt}.png` ?? "preview.png";
      document.body.appendChild(a);
      a.click();
      resolve("downloading");
    } else {
      reject("no image data");
    }
  });
};
