import { Box } from "@mui/material";
import styled from "styled-components";
import { Canvas } from "../Canvas";
import { CanvasPalette } from "../CanvasPalette/CanvasPalette";
import { CanvasPreview } from "../CanvasPreview";
import { CanvasTools } from "../CanvasTools";
import { DimensionsDialog } from "../DimensionsDialog";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 125px 1fr 125px;
  height: 100%;

  @media (min-width: 1280px) {
    grid-template-columns: 200px 1fr 200px;
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
`;

export const AppLayout = () => {
  return (
    <StyledAppLayout>
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
    </StyledAppLayout>
  );
};
