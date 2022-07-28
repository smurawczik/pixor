import { RootState } from "../store";

const dimensions = (state: RootState) => {
  return state.canvasReducer.size;
};

const pixelDimensions = (state: RootState) => {
  return state.canvasReducer.pixelSize;
};

const coordinates = (state: RootState) => {
  return state.canvasReducer.coords;
};

const currentColor = (state: RootState) => {
  return state.canvasReducer.palette.currentColor;
};

const getAllColors = (state: RootState) => {
  return state.canvasReducer.palette.allColors;
};

const getPixelData = (state: RootState) => {
  return state.canvasReducer.canvasPixelData;
};

export const canvasSelectors = {
  dimensions,
  pixelDimensions,
  coordinates,
  currentColor,
  getAllColors,
  getPixelData,
};
