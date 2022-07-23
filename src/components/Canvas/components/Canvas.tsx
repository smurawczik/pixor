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
      <CanvasCoords />
      <StyledCanvasWrapper>
        <CanvasTransparentBackground />
        <CanvasElement />
      </StyledCanvasWrapper>
    </>
  );
};
