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
    builder.addCase(
      canvasThunkActions.blurFinish.fulfilled,
      (state, action) => {
        const { canvasPixelData } = action.payload;

        state.frames[state.selectedFrame] = {
          ...state.frames[state.selectedFrame],
          pixelData: {
            ...state.frames[state.selectedFrame].pixelData,
            ...canvasPixelData,
          },
        };
      }
    );
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
        state.frames.splice(
          action.payload.frameToAdd.index,
          0,
          action.payload.frameToAdd
        );
        state.selectedFrame = action.payload.frameToAdd.index;
      }
    );
    builder.addCase(
      animationThunkActions.duplicateFrame.fulfilled,
      (state, action) => {
        const nextSelectedFrame = state.selectedFrame + 1;
        state.frames.splice(
          nextSelectedFrame,
          0,
          action.payload.frameToDuplicate
        );
        if (nextSelectedFrame < state.frames.length - 1) {
          state.frames = state.frames.map((frame, i) => {
            frame.index = i;
            return frame;
          });
        }
        state.selectedFrame = nextSelectedFrame;
      }
    );
    builder.addCase(
      animationThunkActions.selectFrame.fulfilled,
      (state, action) => {
        state.selectedFrame = action.payload.frameToSelect.index;
      }
    );
    builder.addCase(
      animationThunkActions.selectNextFrame.fulfilled,
      (state, action) => {
        state.selectedFrame = action.payload.frameToSelect.index;
      }
    );
  },
});

export const { actions: animationActions } = animationSlice;

export default animationSlice.reducer;
