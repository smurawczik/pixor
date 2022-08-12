import { Box } from "@mui/material";
import styled from "styled-components";
import { LARGE_PC_BREAKPOINT } from "../../constants";
import { Canvas } from "../Canvas";
import { CanvasAnimation } from "../CanvasAnimation";
import { CanvasPalette } from "../CanvasPalette/CanvasPalette";
import { CanvasPreview } from "../CanvasPreview";
import { CanvasTools } from "../CanvasTools";
import { DimensionsDialog } from "../DimensionsDialog";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledAppThreeMainPanelsLayout = styled.div`
  display: grid;
  grid-template-columns: 125px 1fr minmax(max-content, 125px);
  flex-grow: 1.5;

  @media (min-width: ${LARGE_PC_BREAKPOINT}) {
    grid-template-columns: 200px 1fr minmax(max-content, 200px);
  }
`;

const StyledAppAnimationLayer = styled.div`
  min-height: 60px;
  border-top: 2px solid indigo;

  @media (min-width: ${LARGE_PC_BREAKPOINT}) {
    min-height: 100px;
  }
`;

const StyledAppLeftPanelWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAppRightPanelWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledCanvasPaneWrapper = styled.div`
  border-left: 2px solid indigo;
  border-right: 2px solid indigo;
  display: flex;
  flex-direction: column;
`;

export const AppLayout = () => {
  return (
    <StyledAppLayout>
      <StyledAppThreeMainPanelsLayout>
        <StyledAppLeftPanelWrapper>
          <Box sx={{ m: 2 }}>
            <DimensionsDialog />
            <CanvasTools />
          </Box>
        </StyledAppLeftPanelWrapper>
        <StyledCanvasPaneWrapper>
          <Canvas />
        </StyledCanvasPaneWrapper>
        <StyledAppRightPanelWrapper>
          <Box sx={{ m: 2 }}>
            <CanvasPalette />
            <CanvasPreview />
          </Box>
        </StyledAppRightPanelWrapper>
      </StyledAppThreeMainPanelsLayout>
      <StyledAppAnimationLayer>
        <CanvasAnimation />
      </StyledAppAnimationLayer>
    </StyledAppLayout>
  );
};
