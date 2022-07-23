import {
  CANVAS_DIMENSION_MULTIPLIER,
  CANVAS_INITIAL_HEIGHT,
  CANVAS_INITIAL_WIDTH,
} from "./canvas.constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  CanvasCoords,
  CanvasSize,
  CanvasSliceState,
} from "./canvas.types";
import chroma from "chroma-js";
import { canvasThunkActions } from "./canvas.thunks";

const blackInitialColor = chroma.rgb(0, 0, 0).hex();
const initialState: CanvasSliceState = {
  size: {
    width: CANVAS_INITIAL_WIDTH,
    height: CANVAS_INITIAL_HEIGHT,
  },
  pixelSize: {
    width: CANVAS_INITIAL_WIDTH * CANVAS_DIMENSION_MULTIPLIER,
    height: CANVAS_INITIAL_HEIGHT * CANVAS_DIMENSION_MULTIPLIER,
  },
  coords: {},
  palette: {
    currentColor: blackInitialColor,
    allColors: [blackInitialColor],
  },
  canvasPixelData: {},
};

chroma.random();

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setDimensions: (state, action: PayloadAction<CanvasSize>) => {
      const { height, width } = action.payload;

      state.size = {
        height: height,
        width: width,
      };

      state.pixelSize = {
        height: state.size.height * CANVAS_DIMENSION_MULTIPLIER,
        width: state.size.width * CANVAS_DIMENSION_MULTIPLIER,
      };
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.size.width = action.payload;
      state.pixelSize.width = state.size.width * CANVAS_DIMENSION_MULTIPLIER;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.size.height = action.payload;
      state.pixelSize.height = state.size.height * CANVAS_DIMENSION_MULTIPLIER;
    },
    setCoords: (state, action: PayloadAction<CanvasCoords>) => {
      state.coords = action.payload;
    },
    changeColor: (
      state,
      action: PayloadAction<CanvasSliceState["palette"]["currentColor"]>
    ) => {
      state.palette.currentColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(canvasThunkActions.draw.fulfilled, (state, action) => {
      state.canvasPixelData = {
        ...state.canvasPixelData,
        ...action.payload,
      };

      const color = Object.values(action.payload)?.[0]?.color;

      if (!color || state.palette.allColors.includes(color)) return;

      state.palette.allColors.push(color);
    });
    builder.addCase(canvasThunkActions.erase.fulfilled, (state, action) => {
      delete state.canvasPixelData[action.payload];
    });
  },
});

export const { actions: canvasActions } = canvasSlice;

export default canvasSlice.reducer;
