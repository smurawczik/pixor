import { animationThunkActions } from "./../animation/animation.thunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import {
  CANVAS_DIMENSION_MULTIPLIER,
  CANVAS_INITIAL_HEIGHT,
  CANVAS_INITIAL_WIDTH,
  CANVAS_TRANSPARENT_COLOR,
} from "./canvas.constants";
import {
  generateNbyMObjectMatrix,
  generateNbyMObjectMatrixWithPreviousData,
} from "./canvas.helpers";
import { lineMoving } from "./canvas.slice.helpers";
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
    setDimensions: (
      state: CanvasSliceState,
      action: PayloadAction<CanvasSize>
    ) => {
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
    setWidth: (state: CanvasSliceState, action: PayloadAction<number>) => {
      state.size.width = action.payload;
      state.pixelSize.width = state.size.width * CANVAS_DIMENSION_MULTIPLIER;
      state.canvasPixelData = generateNbyMObjectMatrixWithPreviousData(
        action.payload,
        state.size.height,
        state.canvasPixelData
      );
    },
    setHeight: (state: CanvasSliceState, action: PayloadAction<number>) => {
      state.size.height = action.payload;
      state.pixelSize.height = state.size.height * CANVAS_DIMENSION_MULTIPLIER;
      state.canvasPixelData = generateNbyMObjectMatrixWithPreviousData(
        state.size.width,
        action.payload,
        state.canvasPixelData
      );
    },
    setCoords: (
      state: CanvasSliceState,
      action: PayloadAction<CanvasCoords>
    ) => {
      state.coords = action.payload;
    },
    changeColor: (
      state: CanvasSliceState,
      action: PayloadAction<CanvasSliceState["palette"]["currentColor"]>
    ) => {
      state.palette.currentColor = action.payload;
    },
    addColorToPaletteIfPossible: (
      state: CanvasSliceState,
      action: PayloadAction<string>
    ) => {
      if (!action.payload || state.palette.allColors.includes(action.payload))
        return;

      state.palette.allColors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(canvasThunkActions.draw.fulfilled, (state, action) => {
      const { x, y, color } = action.payload;
      if (!color) return;

      state.canvasPixelData[x][y] = {
        color,
      };
    });
    builder.addCase(canvasThunkActions.blur.fulfilled, (state, action) => {
      const { x, y, color } = action.payload;
      if (!color) return;

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
    builder.addCase(canvasThunkActions.lineStart.fulfilled, (state, action) => {
      state.drawingLineData = {
        start: {
          x: action.payload.x,
          y: action.payload.y,
        },
        end: {
          x: action.payload.x,
          y: action.payload.y,
        },
        slope: 1,
      };
    });
    builder.addCase(canvasThunkActions.lineMove.fulfilled, (state, action) => {
      lineMoving(state, action);
    });
    builder.addCase(canvasThunkActions.lineEnd.fulfilled, (state, action) => {
      lineMoving(state, action);
    });
    builder.addCase(
      animationThunkActions.duplicateFrame.fulfilled,
      (state, action) => {
        const newCanvasMatrix = generateNbyMObjectMatrix(
          state.size.width,
          state.size.height
        );

        const { pixelData } = action.payload.frameToDuplicate;

        Object.keys(pixelData).forEach((xKey) => {
          const xIndex = parseInt(xKey);
          Object.keys(pixelData[xIndex]).forEach((yKey) => {
            const yIndex = parseInt(yKey);
            if (
              pixelData?.[xIndex]?.[yIndex].color &&
              newCanvasMatrix?.[xIndex]?.[yIndex]
            ) {
              newCanvasMatrix[xIndex][yIndex].color =
                pixelData[xIndex][yIndex].color;
            }
          });
        });

        state.canvasPixelData = newCanvasMatrix;
      }
    );
    builder.addCase(
      animationThunkActions.selectFrame.fulfilled,
      (state, action) => {
        const newCanvasMatrix = generateNbyMObjectMatrix(
          state.size.width,
          state.size.height
        );

        const { pixelData } = action.payload.frameToSelect;

        Object.keys(pixelData).forEach((xKey) => {
          const xIndex = parseInt(xKey);
          Object.keys(pixelData[xIndex]).forEach((yKey) => {
            const yIndex = parseInt(yKey);
            if (
              pixelData?.[xIndex]?.[yIndex].color &&
              newCanvasMatrix?.[xIndex]?.[yIndex]
            ) {
              newCanvasMatrix[xIndex][yIndex].color =
                pixelData[xIndex][yIndex].color;
            }
          });
        });

        state.canvasPixelData = newCanvasMatrix;
      }
    );
    builder.addCase(animationThunkActions.addFrame.fulfilled, (state) => {
      state.canvasPixelData = generateNbyMObjectMatrix(
        state.size.width,
        state.size.height
      );
    });
  },
});

export const { actions: canvasActions } = canvasSlice;

export default canvasSlice.reducer;
