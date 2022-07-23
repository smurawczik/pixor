import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./canvas/canvas.slice";
import toolsReducer from "./tools/tools.slice";

export const store = configureStore({
  reducer: {
    canvasReducer,
    toolsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
