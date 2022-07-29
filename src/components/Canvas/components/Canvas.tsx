import { Box } from "@mui/material";
import styled from "styled-components";
import { CANVAS_SCALE_FACTOR } from "../../../redux/canvas/canvas.constants";
import { CanvasTransparentBackground } from "../../CanvasTransparentBackground";
import { CanvasCoords } from "./CanvasCoords";

import { CanvasElement } from "./CanvasElement";

const StyledCanvasWrapper = styled.div`
  display: inline-flex;
  position: relative;
  /* scaling */
  transform-origin: left top;
  transform: scale(${CANVAS_SCALE_FACTOR}, ${CANVAS_SCALE_FACTOR});
`;

export const Canvas = () => {
  return (
    <>
      <Box sx={{ p: 2, borderBottom: "2px solid indigo" }}>
        <CanvasCoords />
      </Box>
      <StyledCanvasWrapper>
        <CanvasTransparentBackground />
        <CanvasElement />
      </StyledCanvasWrapper>
    </>
  );
};
