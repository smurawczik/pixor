import { styled } from "@mui/material";
import { CANVAS_SCALE_FACTOR } from "../../../redux/canvas/canvas.constants";
import { CanvasTransparentBackground } from "../../CanvasTransparentBackground";
import { CanvasCoords } from "./CanvasCoords";

import { CanvasElement } from "./CanvasElement";

const StyledCanvasCoordsWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.primary.light}`,
}));

const StyledCanvasWrapper = styled("div")`
  display: inline-flex;
  position: relative;
  /* scaling */
  transform-origin: left top;
  transform: scale(${CANVAS_SCALE_FACTOR}, ${CANVAS_SCALE_FACTOR});
`;

const StyledCanvasOverflowWrapper = styled("div")`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const Canvas = () => {
  return (
    <>
      <StyledCanvasCoordsWrapper>
        <CanvasCoords />
      </StyledCanvasCoordsWrapper>
      <StyledCanvasOverflowWrapper>
        <StyledCanvasWrapper>
          <CanvasTransparentBackground />
          <CanvasElement />
        </StyledCanvasWrapper>
      </StyledCanvasOverflowWrapper>
    </>
  );
};
