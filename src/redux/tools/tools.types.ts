export enum ToolsEnum {
  PENCIL = 1,
  ERASER,
  BUCKET,
  BLUR,
}

export interface ToolsSliceState {
  selectedTool: ToolsEnum;
}
