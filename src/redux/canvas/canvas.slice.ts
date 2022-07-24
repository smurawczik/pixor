import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import {
  CANVAS_DIMENSION_MULTIPLIER,
  CANVAS_INITIAL_HEIGHT,
  CANVAS_INITIAL_WIDTH,
  CANVAS_TRANSPARENT_COLOR,
} from "./canvas.constants";
import { generateNbyMObjectMatrix } from "./canvas.helpers";
import { canvasThunkActions } from "./canvas.thunks";
import type {
  CanvasCoords,
  CanvasSize,
  CanvasSliceState,
} from "./canvas.types";

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
  canvasPixelData: generateNbyMObjectMatrix(
    CANVAS_INITIAL_WIDTH,
    CANVAS_INITIAL_HEIGHT
  ),
};

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
    addColorToPaletteIfPossible: (state, action: PayloadAction<string>) => {
      if (!action.payload || state.palette.allColors.includes(action.payload))
        return;

      state.palette.allColors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(canvasThunkActions.draw.fulfilled, (state, action) => {
      const { x, y, color } = action.payload;
      if (!color) return;

      if (!state.canvasPixelData[x]) state.canvasPixelData[x] = {};

      state.canvasPixelData[x][y] = {
        color,
      };
    });
    builder.addCase(canvasThunkActions.erase.fulfilled, (state, action) => {
      const { x, y } = action.payload;
      state.canvasPixelData[x][y].color = CANVAS_TRANSPARENT_COLOR;
    });
    builder.addCase(canvasThunkActions.bucket.fulfilled, (state, action) => {
      state.canvasPixelData = action.payload;
    });
  },
});

export const { actions: canvasActions } = canvasSlice;

export default canvasSlice.reducer;
