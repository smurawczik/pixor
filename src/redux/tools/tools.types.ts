export enum ToolsEnum {
  PENCIL = "Draw",
  ERASER = "Erase",
  BUCKET = "Paint",
  BLUR = "Blur",
  LINE = "Draw Line",
  CLEAR = "Clear Canvas",
}

export interface ToolsSliceState {
  selectedTool: ToolsEnum;
}
