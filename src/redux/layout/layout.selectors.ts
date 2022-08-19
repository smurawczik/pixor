import { LayoutSliceState } from "./layout.types";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const layoutState = (state: RootState) => state.layoutReducer;
const getPanes = createSelector(
  layoutState,
  (state: LayoutSliceState) => state
);

export const layoutSelectors = {
  getPanes,
};
