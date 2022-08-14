import React, { createContext, FC, useReducer } from "react";
import { canvasElementContextReducer } from "./canvasElement.reducer";
import {
  CanvasElementContextDispatch,
  CanvasElementContextState,
} from "./canvasElement.types";

export const CanvasElementContext = createContext<
  | { state: CanvasElementContextState; dispatch: CanvasElementContextDispatch }
  | undefined
>(undefined);

export const CanvasElementProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(canvasElementContextReducer, {
    canvasElement: null,
  });
  const value = { state, dispatch };

  return (
    <CanvasElementContext.Provider value={value}>
      {children}
    </CanvasElementContext.Provider>
  );
};
