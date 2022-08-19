import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./canvas/canvas.slice";
import toolsReducer from "./tools/tools.slice";
import animationReducer from "./animation/animation.slice";
import layoutReducer from "./layout/layout.slice";

export const store = configureStore({
  reducer: {
    canvasReducer,
    toolsReducer,
    animationReducer,
    layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
