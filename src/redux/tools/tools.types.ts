export enum ToolsEnum {
  PENCIL = 1,
  ERASER,
  BUCKET,
}

export interface ToolsSliceState {
  selectedTool: ToolsEnum;
}
