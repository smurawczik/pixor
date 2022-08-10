import { CanvasPixelData } from "../canvas/canvas.types";

export enum AnimationPlayState {
  PLAYING = 1,
  PAUSED,
}

export type AnimationFrame = {
  pixelData: CanvasPixelData;
  index: number;
};

export interface AnimationSliceState {
  playState: AnimationPlayState;
  frames: AnimationFrame[];
  selectedFrame: number;
}
