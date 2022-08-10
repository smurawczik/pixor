import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AnimationSliceState } from "./animation.types";

const animationState = (state: RootState) => state.animationReducer;
const playState = createSelector(
  animationState,
  (state: AnimationSliceState) => state.playState
);

const frames = createSelector(
  animationState,
  (state: AnimationSliceState) => state.frames
);

const isFrameSelected = (index: number) =>
  createSelector(
    animationState,
    (state: AnimationSliceState) => state.selectedFrame === index
  );

export const animationSelectors = {
  playState,
  frames,
  isFrameSelected,
};
