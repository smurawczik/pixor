import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import {
  FrameNumberToDuplicate,
  FrameNumberToIncrease,
  FrameNumberToSelect,
  FrameToAdd,
  FrameToDuplicate,
  FrameToSelect,
} from "./animation.types";

const selectFrame = createAsyncThunk<
  FrameToSelect,
  FrameNumberToSelect,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("selectAnimationFrame", ({ frameNumberToSelect }, reduxApi) => {
  const nextSelectedFrame =
    reduxApi.getState().animation.frames[frameNumberToSelect];

  return {
    frameToSelect: nextSelectedFrame,
  };
});

const selectNextFrame = createAsyncThunk<
  FrameToSelect,
  FrameNumberToSelect,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("selectNextAnimationFrame", ({ frameNumberToSelect }, reduxApi) => {
  const nextSelectedFrame =
    reduxApi.getState().animation.frames?.[frameNumberToSelect] ??
    reduxApi.getState().animation.frames[0];

  return {
    frameToSelect: nextSelectedFrame,
  };
});

const addFrame = createAsyncThunk<
  FrameToAdd,
  FrameNumberToIncrease,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("addAnimationFrame", ({ frameNumberToIncrease }) => {
  return {
    frameToAdd: {
      id: nanoid(5),
      index: frameNumberToIncrease + 1,
      pixelData: {},
    },
  };
});

const duplicateFrame = createAsyncThunk<
  FrameToDuplicate,
  FrameNumberToDuplicate,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("duplicateAnimationFrame", ({ frameNumberToDuplicate }, reduxApi) => {
  const frame = reduxApi.getState().animation.frames[frameNumberToDuplicate];

  return {
    frameToDuplicate: { ...frame, id: nanoid(5), index: frame.index + 1 },
  };
});

export const animationThunkActions = {
  addFrame,
  duplicateFrame,
  selectFrame,
  selectNextFrame,
};
