import { SET_CANVAS_ELEMENT, SET_CANVAS_URL } from "./canvasElement.constants";

export type CanvasElementContextState = {
  canvasElement: HTMLCanvasElement | null;
  dataURL: string;
};

export type CanvasElementContextActions =
  | {
      type: typeof SET_CANVAS_ELEMENT;
      canvasElement: HTMLCanvasElement | null;
    }
  | {
      type: typeof SET_CANVAS_URL;
      dataURL: string;
    }
  | {
      type: "";
    };

export type CanvasElementContextDispatch = (
  action: CanvasElementContextActions
) => void;
