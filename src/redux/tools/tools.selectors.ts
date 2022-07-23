import { RootState } from "../store";
import { ToolsEnum } from "./tools.types";

const isPencilSelected = (state: RootState) => {
  return state.toolsReducer.selectedTool === ToolsEnum.PENCIL;
};

const isEraserSelected = (state: RootState) => {
  return state.toolsReducer.selectedTool === ToolsEnum.ERASER;
};

const isBucketSelected = (state: RootState) => {
  return state.toolsReducer.selectedTool === ToolsEnum.BUCKET;
};

const getCurrentTool = (state: RootState) => {
  return state.toolsReducer.selectedTool;
};

export const toolsSelectors = {
  isPencilSelected,
  isEraserSelected,
  isBucketSelected,
  getCurrentTool,
};
