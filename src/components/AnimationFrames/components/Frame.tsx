import { styled } from "@mui/material";
import { debounce } from "lodash";
import { FC, useRef } from "react";
import { useMedia } from "react-use";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { animationThunkActions } from "../../../redux/animation/animation.thunks";
import { AnimationFrame } from "../../../redux/animation/animation.types";
import {
  CANVAS_EXTRA_REPRESENTATION_THROTTLE_TIME,
  CANVAS_TRANSPARENT_COLOR,
} from "../../../redux/canvas/canvas.constants";
import {
  clearAllCanvas,
  drawPixelInCanvas,
} from "../../../redux/canvas/canvas.paint.helpers";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const StyledCanvas = styled("canvas")`
  z-index: 1;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

const StyledFrame = styled("div", {
  shouldForwardProp: (prop) => prop !== "isFrameSelected",
})<{ isFrameSelected: boolean }>`
  border: ${({ theme, isFrameSelected }) =>
    isFrameSelected
      ? `2px solid ${theme.palette.secondary.main}`
      : `2px solid ${theme.palette.common.white}`};
  background-color: rgba(255, 255, 255, 0.75);
  margin-left: 8px;
  margin-right: 8px;
  display: inline-flex;
  cursor: pointer;
`;

export const Frame: FC<{ frame: AnimationFrame }> = ({ frame }) => {
  const { index, pixelData } = frame;

  const dispatch = useAppDispatch();
  const isFrameSelected = useAppSelector(
    animationSelectors.isFrameSelected(index)
  );
  const canvasDimensions = useAppSelector(canvasSelectors.dimensions);
  const isLargeScreen = useMedia(`(min-width: ${LARGE_PC_BREAKPOINT})`);

  const CANVAS_PREVIEW_MULTIPLIER = isLargeScreen ? 2 : 1;

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const debounceDrawingInCanvas = useRef(
    debounce((pixelData) => {
      if (previewCanvasRef.current) {
        const previewCanvasContext = previewCanvasRef.current.getContext("2d");

        if (previewCanvasContext) {
          clearAllCanvas(previewCanvasRef.current, previewCanvasContext);

          Object.keys(pixelData).forEach((x) => {
            const intX = parseInt(x);
            Object.keys(pixelData[intX]).forEach((y) => {
              const intY = parseInt(y);
              const currentColorInCoordinate = pixelData[intX]?.[intY]?.color;
              if (currentColorInCoordinate !== CANVAS_TRANSPARENT_COLOR) {
                drawPixelInCanvas(
                  previewCanvasContext,
                  intX,
                  intY,
                  currentColorInCoordinate,
                  CANVAS_PREVIEW_MULTIPLIER
                );
              }
            });
          });
        }
      }
    }, CANVAS_EXTRA_REPRESENTATION_THROTTLE_TIME)
  ).current;

  debounceDrawingInCanvas(pixelData);

  return (
    <StyledFrame
      isFrameSelected={isFrameSelected}
      onClick={() =>
        dispatch(
          animationThunkActions.selectFrame({ frameNumberToSelect: index })
        )
      }
    >
      <StyledCanvas
        ref={previewCanvasRef}
        width={canvasDimensions.width * CANVAS_PREVIEW_MULTIPLIER}
        height={canvasDimensions.height * CANVAS_PREVIEW_MULTIPLIER}
      />
    </StyledFrame>
  );
};
