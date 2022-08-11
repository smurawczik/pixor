import { CanvasPixelData } from "../canvas/canvas.types";

export enum AnimationPlayState {
  PLAYING = 1,
  PAUSED,
}

export type AnimationFrame = {
  pixelData: CanvasPixelData;
  id: string;
  index: number;
};

export interface AnimationSliceState {
  playState: AnimationPlayState;
  frames: AnimationFrame[];
  selectedFrame: number;
}

export type FrameToDuplicate = {
  frameToDuplicate: AnimationFrame;
};

export type FrameNumberToDuplicate = {
  frameNumberToDuplicate: number;
};

export type FrameToSelect = {
  frameToSelect: AnimationFrame;
};

export type FrameNumberToSelect = {
  frameNumberToSelect: number;
};

export type FrameToAdd = {
  frameToAdd: AnimationFrame;
};

export type FrameNumberToIncrease = {
  frameNumberToIncrease: number;
};
