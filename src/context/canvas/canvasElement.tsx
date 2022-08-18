import React, { createContext, FC, useMemo, useReducer } from "react";
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
    dataURL: "",
  });
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <CanvasElementContext.Provider value={value}>
      {children}
    </CanvasElementContext.Provider>
  );
};
