import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ToolsEnum, ToolsSliceState } from "./tools.types";

const initialState: ToolsSliceState = {
  selectedTool: ToolsEnum.PENCIL,
};

export const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    selectTool: (state, action: PayloadAction<ToolsEnum>) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { actions: toolsActions } = toolsSlice;

export default toolsSlice.reducer;
