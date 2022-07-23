import styled from "styled-components";
import { Canvas } from "../Canvas";
import { CanvasPalette } from "../CanvasPalette/CanvasPalette";
import { CanvasTools } from "../CanvasTools";
import { DimensionsDialog } from "../DimensionsDialog";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

export const AppLayout = () => {
  return (
    <StyledAppLayout>
      <div>
        <DimensionsDialog />
        <CanvasTools />
      </div>
      <div>
        <Canvas />
      </div>
      <div>
        <CanvasPalette />
      </div>
    </StyledAppLayout>
  );
};
