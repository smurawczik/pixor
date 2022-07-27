import styled from "styled-components";
import { Canvas } from "../Canvas";
import { CanvasPalette } from "../CanvasPalette/CanvasPalette";
import { CanvasTools } from "../CanvasTools";
import { DimensionsDialog } from "../DimensionsDialog";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  height: 100%;

  @media (min-width: 1280px) {
    grid-template-columns: 200px 1fr 200px;
  }
`;

const StyledAppLeftPanelWrapper = styled.div`
  box-shadow: 0 0 0 1px indigo;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAppRightPanelWrapper = styled.div`
  box-shadow: 0 0 0 1px indigo;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const AppLayout = () => {
  return (
    <StyledAppLayout>
      <StyledAppLeftPanelWrapper>
        <DimensionsDialog />
        <CanvasTools />
      </StyledAppLeftPanelWrapper>
      <div>
        <Canvas />
      </div>
      <StyledAppRightPanelWrapper>
        <CanvasPalette />
      </StyledAppRightPanelWrapper>
    </StyledAppLayout>
  );
};
