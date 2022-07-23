import styled from "styled-components";
import { CANVAS_DIMENSION_MULTIPLIER } from "../../redux/canvas/canvas.constants";

export const CanvasTransparentBackground = styled.div`
  background-image: linear-gradient(45deg, #b0b0b0 25%, transparent 25%),
    linear-gradient(-45deg, #b0b0b0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #b0b0b0 75%),
    linear-gradient(-45deg, transparent 75%, #b0b0b0 75%);
  background-size: ${CANVAS_DIMENSION_MULTIPLIER * 2}px
    ${CANVAS_DIMENSION_MULTIPLIER * 2}px;
  background-position: 0 0, 0 ${CANVAS_DIMENSION_MULTIPLIER}px,
    ${CANVAS_DIMENSION_MULTIPLIER}px -${CANVAS_DIMENSION_MULTIPLIER}px,
    -${CANVAS_DIMENSION_MULTIPLIER}px 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`;
