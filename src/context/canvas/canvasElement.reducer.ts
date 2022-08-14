import { SET_CANVAS_ELEMENT } from "./canvasElement.constants";
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
        canvasElement: action.canvasElement,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
