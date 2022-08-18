import { SET_CANVAS_ELEMENT, SET_CANVAS_URL } from "./canvasElement.constants";
import {
  CanvasElementContextState,
  CanvasElementContextActions,
} from "./canvasElement.types";

export const canvasElementContextReducer = (
  state: CanvasElementContextState,
  action: CanvasElementContextActions
) => {
  switch (action.type) {
    case SET_CANVAS_ELEMENT: {
      return {
        ...state,
        canvasElement: action.canvasElement,
      };
    }
    case SET_CANVAS_URL: {
      return {
        ...state,
        dataURL: action.dataURL,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
