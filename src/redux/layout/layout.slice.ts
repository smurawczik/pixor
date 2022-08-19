import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutSliceState, PaneLayout } from "./layout.types";

const initialState: LayoutSliceState = {
  toolsPane: {
    visible: true,
    layout: PaneLayout.LEFT,
  },
  helpersPane: {
    visible: true,
    layout: PaneLayout.RIGHT,
  },
  animationPane: {
    visible: true,
    layout: PaneLayout.BOTTOM,
  },
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changePaneLayout: (
      state: LayoutSliceState,
      action: PayloadAction<{
        pane: keyof typeof state;
        layout: PaneLayout;
      }>
    ) => {
      const { pane, layout } = action.payload;

      state[pane] = {
        ...state[pane],
        layout,
      };
    },
    changePaneVisibility: (
      state: LayoutSliceState,
      action: PayloadAction<keyof typeof state>
    ) => {
      state[action.payload] = {
        ...state[action.payload],
        visible: !state[action.payload].visible,
      };
    },
  },
});

export const { actions: layoutActions } = layoutSlice;

export default layoutSlice.reducer;
