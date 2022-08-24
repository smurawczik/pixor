import { RootState } from "../store";
import { ToolsEnum } from "./tools.types";

const isPencilSelected = (state: RootState) => {
  return state.tools.selectedTool === ToolsEnum.PENCIL;
};

const isEraserSelected = (state: RootState) => {
  return state.tools.selectedTool === ToolsEnum.ERASER;
};

const isBucketSelected = (state: RootState) => {
  return state.tools.selectedTool === ToolsEnum.BUCKET;
};

const getCurrentTool = (state: RootState) => {
  return state.tools.selectedTool;
};

const isToolSelected = (tool: ToolsEnum) => (state: RootState) => {
  return state.tools.selectedTool === tool;
};

export const toolsSelectors = {
  isPencilSelected,
  isEraserSelected,
  isBucketSelected,
  getCurrentTool,
  isToolSelected,
};
