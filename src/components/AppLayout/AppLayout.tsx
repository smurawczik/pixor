import { Box } from "@mui/material";
import styled from "styled-components";
import { LARGE_PC_BREAKPOINT } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { layoutSelectors } from "../../redux/layout/layout.selectors";
import { AppMenu } from "../AppMenu";
import { Canvas } from "../Canvas";
import { CanvasAnimation } from "../CanvasAnimation";
import { CanvasPalette } from "../CanvasPalette/CanvasPalette";
import { CanvasPreview } from "../CanvasPreview";
import { CanvasTools } from "../CanvasTools";
import { DimensionsDialog } from "../DimensionsDialog";

type PaneVisibility = {
  visible: boolean;
};

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledAppThreeMainPanelsLayout = styled.div`
  display: flex;
  flex-grow: 2;
`;

const StyledAppAnimationLayer = styled.div<PaneVisibility>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  min-height: 60px;
  border-top: 2px solid indigo;

  @media (min-width: ${LARGE_PC_BREAKPOINT}) {
    min-height: 100px;
  }
`;

const StyledAppLeftPanelWrapper = styled.div<PaneVisibility>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  z-index: 2;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  max-width: 180px;
`;

const StyledAppRightPanelWrapper = styled.div<PaneVisibility>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  z-index: 2;
  flex-direction: column;
  align-items: flex-start;
  min-width: 100px;
  max-width: 180px;
`;

const StyledCanvasPaneWrapper = styled.div`
  border-left: 2px solid indigo;
  border-right: 2px solid indigo;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

export const AppLayout = () => {
  const { animationPane, helpersPane, toolsPane } = useAppSelector(
    layoutSelectors.getPanes
  );
  return (
    <StyledAppLayout>
      <AppMenu />
      <StyledAppThreeMainPanelsLayout>
        <StyledAppLeftPanelWrapper visible={toolsPane.visible}>
          <Box sx={{ m: 2 }}>
            <DimensionsDialog />
            <CanvasTools />
          </Box>
        </StyledAppLeftPanelWrapper>
        <StyledCanvasPaneWrapper>
          <Canvas />
        </StyledCanvasPaneWrapper>
        <StyledAppRightPanelWrapper visible={helpersPane.visible}>
          <Box sx={{ m: 2 }}>
            <CanvasPalette />
            <CanvasPreview />
          </Box>
        </StyledAppRightPanelWrapper>
      </StyledAppThreeMainPanelsLayout>
      <StyledAppAnimationLayer visible={animationPane.visible}>
        <CanvasAnimation />
      </StyledAppAnimationLayer>
    </StyledAppLayout>
  );
};
