import { configureStore } from "@reduxjs/toolkit";
import canvas from "./canvas/canvas.slice";
import tools from "./tools/tools.slice";
import animation from "./animation/animation.slice";
import layout from "./layout/layout.slice";

export const store = configureStore({
  reducer: {
    canvas,
    tools,
    animation,
    layout,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
