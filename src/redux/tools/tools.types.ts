export enum ToolsEnum {
  PENCIL = 1,
  ERASER,
  BUCKET,
  BLUR,
  LINE,
}

export interface ToolsSliceState {
  selectedTool: ToolsEnum;
}
