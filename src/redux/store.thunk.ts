import { AppDispatch, RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

const restoreFromFileData = createAsyncThunk<
  RootState,
  RootState,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("restoreReduxStore", (state: RootState) => {
  return state;
});

export const storeThunkActions = {
  restoreFromFileData,
};
