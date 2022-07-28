import { Box } from "@mui/material";
import styled from "styled-components";
import { CanvasTransparentBackground } from "../../CanvasTransparentBackground";
import { CanvasCoords } from "./CanvasCoords";

import { CanvasElement } from "./CanvasElement";

const StyledCanvasWrapper = styled.div`
  display: inline-flex;
  position: relative;
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
