import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { canvasThunkActions } from "../canvas/canvas.thunks";
import {
  AnimationFrame,
  AnimationPlayState,
  AnimationSliceState,
} from "./animation.types";

const initialState: AnimationSliceState = {
  playState: AnimationPlayState.PAUSED,
  frames: [
    {
      index: 0,
      pixelData: {},
    },
  ],
  selectedFrame: 0,
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setPlayState: (
      state: AnimationSliceState,
      action: PayloadAction<AnimationPlayState>
    ) => {
      state.playState = action.payload;
    },
    addFrame: (
      state: AnimationSliceState,
      action: PayloadAction<AnimationFrame>
    ) => {
      state.frames.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(canvasThunkActions.draw.fulfilled, (state, action) => {
      const { x, y, color } = action.payload;

      state.frames[state.selectedFrame] = {
        ...state.frames[state.selectedFrame],
        pixelData: {
          ...state.frames[state.selectedFrame].pixelData,
          [x]: {
            ...state.frames[state.selectedFrame].pixelData[x],
            [y]: {
              color,
            },
          },
        },
      };
    });
  },
});

export const { actions: animationActions } = animationSlice;

export default animationSlice.reducer;
