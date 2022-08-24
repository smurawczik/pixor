import { RootState } from "../store";

const dimensions = (state: RootState) => {
  return state.canvas.size;
};

const pixelDimensions = (state: RootState) => {
  return state.canvas.pixelSize;
};

const coordinates = (state: RootState) => {
  return state.canvas.coords;
};

const currentColor = (state: RootState) => {
  return state.canvas.palette.currentColor;
};

const getAllColors = (state: RootState) => {
  return state.canvas.palette.allColors;
};

const getPixelData = (state: RootState) => {
  return state.canvas.canvasPixelData;
};

export const canvasSelectors = {
  dimensions,
  pixelDimensions,
  coordinates,
  currentColor,
  getAllColors,
  getPixelData,
};
