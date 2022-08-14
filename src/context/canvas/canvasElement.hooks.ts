import { useContext } from "react";
import { CanvasElementContext } from "./canvasElement";

export const useCanvasElementContext = () => {
  const context = useContext(CanvasElementContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
