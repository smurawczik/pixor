import { storeThunkActions } from "./../store.thunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { clone } from "lodash";
import { animationThunkActions } from "./../animation/animation.thunks";
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
import {
  blurPixel,
  frameSelectionInCanvas,
  lineMoving,
} from "./canvas.slice.helpers";
import { canvasThunkActions } from "./canvas.thunks";
import type {
  CanvasCoords,
  CanvasPixelData,
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
    changeToGrayscale: (state: CanvasSliceState) => {
      const pixelData = state.canvasPixelData;
      Object.keys(pixelData).forEach((xKey) => {
        const xIndex = parseInt(xKey);
        Object.keys(pixelData[xIndex]).forEach((yKey) => {
          const yIndex = parseInt(yKey);
          if (
            pixelData?.[xIndex]?.[yIndex].color !== CANVAS_TRANSPARENT_COLOR
          ) {
            const chromaColorRGB = chroma(
              pixelData?.[xIndex]?.[yIndex].color
            ).rgb();
            const grayedColor =
              (chromaColorRGB[0] + chromaColorRGB[1] + chromaColorRGB[2]) / 3;
            pixelData[xIndex][yIndex].color = chroma(
              grayedColor,
              grayedColor,
              grayedColor
            ).hex();
          }
        });
      });
      state.canvasPixelData = pixelData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(canvasThunkActions.clearCanvas.fulfilled, (state, action) => {
        state.canvasPixelData = generateNbyMObjectMatrix(
          state.size.width,
          state.size.width
        );
      })
      .addCase(canvasThunkActions.draw.fulfilled, (state, action) => {
        const { x, y, color } = action.payload;
        if (!color) return;

        state.canvasPixelData[x][y] = {
          color,
        };
      })
      .addCase(canvasThunkActions.blur.fulfilled, (state, action) => {
        const { x, y, color } = action.payload;
        if (!color) return;

        const pixelColor = state.canvasPixelData?.[x]?.[y].color;
        const clonedCanvasPixelData = clone<CanvasPixelData>(
          state.canvasPixelData
        );

        let nextPixelData = blurPixel(
          clonedCanvasPixelData,
          pixelColor,
          x - 1,
          y
        );
        nextPixelData = blurPixel(nextPixelData, pixelColor, x - 1, y + 1);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x, y + 1);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x + 1, y + 1);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x + 1, y);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x + 1, y - 1);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x, y - 1);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x - 1, y - 1);

        nextPixelData = blurPixel(nextPixelData, pixelColor, x - 2, y);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x + 2, y);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x, y - 2);
        nextPixelData = blurPixel(nextPixelData, pixelColor, x, y + 2);

        state.canvasPixelData = nextPixelData;
      })
      .addCase(canvasThunkActions.erase.fulfilled, (state, action) => {
        const { x, y } = action.payload;
        state.canvasPixelData[x][y].color = CANVAS_TRANSPARENT_COLOR;
      })
      .addCase(canvasThunkActions.bucket.fulfilled, (state, action) => {
        state.canvasPixelData = action.payload;
      })
      .addCase(canvasThunkActions.lineStart.fulfilled, (state, action) => {
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
      })
      .addCase(canvasThunkActions.lineMove.fulfilled, (state, action) => {
        lineMoving(state, action);
      })
      .addCase(canvasThunkActions.lineEnd.fulfilled, (state, action) => {
        lineMoving(state, action);
      })
      .addCase(
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
      )
      .addCase(animationThunkActions.selectFrame.fulfilled, (state, action) => {
        frameSelectionInCanvas(state, action);
      })
      .addCase(
        animationThunkActions.selectNextFrame.fulfilled,
        (state, action) => {
          frameSelectionInCanvas(state, action);
        }
      )
      .addCase(animationThunkActions.addFrame.fulfilled, (state) => {
        state.canvasPixelData = generateNbyMObjectMatrix(
          state.size.width,
          state.size.height
        );
      })
      .addCase(
        storeThunkActions.restoreFromFileData.fulfilled,
        (state, action) => {
          return action.payload.canvas;
        }
      );
  },
});

export const { actions: canvasActions } = canvasSlice;

export default canvasSlice.reducer;
