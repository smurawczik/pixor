import { SET_CANVAS_ELEMENT } from "./canvasElement.constants";

export type CanvasElementContextState = {
  canvasElement: HTMLCanvasElement | null;
};
export type CanvasElementContextActions = {
  type: typeof SET_CANVAS_ELEMENT;
  canvasElement: HTMLCanvasElement | null;
};
export type CanvasElementContextDispatch = (
  action: CanvasElementContextActions
) => void;
