import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { CANVAS_TRANSPARENT_COLOR } from "../canvas/canvas.constants";
import { canvasThunkActions } from "../canvas/canvas.thunks";
import { animationThunkActions } from "./animation.thunks";
import { AnimationPlayState, AnimationSliceState } from "./animation.types";

const initialState: AnimationSliceState = {
  playState: AnimationPlayState.PAUSED,
  frames: [
    {
      index: 0,
      pixelData: {},
      id: nanoid(),
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
    builder.addCase(canvasThunkActions.erase.fulfilled, (state, action) => {
      const { x, y } = action.payload;
      state.frames[state.selectedFrame] = {
        ...state.frames[state.selectedFrame],
        pixelData: {
          ...state.frames[state.selectedFrame].pixelData,
          [x]: {
            ...state.frames[state.selectedFrame].pixelData[x],
            [y]: {
              color: CANVAS_TRANSPARENT_COLOR,
            },
          },
        },
      };
    });
    builder.addCase(canvasThunkActions.bucket.fulfilled, (state, action) => {
      state.frames[state.selectedFrame] = {
        ...state.frames[state.selectedFrame],
        pixelData: {
          ...action.payload,
        },
      };
    });
    builder.addCase(canvasThunkActions.lineEnd.fulfilled, (state, action) => {
      state.frames[state.selectedFrame] = {
        ...state.frames[state.selectedFrame],
        pixelData: {
          ...action.payload.canvasPixelData,
        },
      };
    });
    builder.addCase(
      animationThunkActions.addFrame.fulfilled,
      (state, action) => {
        state.frames.push(action.payload.frameToAdd);
        state.selectedFrame = action.payload.frameToAdd.index;
      }
    );
    builder.addCase(
      animationThunkActions.duplicateFrame.fulfilled,
      (state, action) => {
        state.frames.push(action.payload.frameToDuplicate);
        state.selectedFrame += 1;
      }
    );
    builder.addCase(
      animationThunkActions.selectFrame.fulfilled,
      (state, action) => {
        state.selectedFrame = action.payload.frameToSelect.index;
      }
    );
  },
});

export const { actions: animationActions } = animationSlice;

export default animationSlice.reducer;
