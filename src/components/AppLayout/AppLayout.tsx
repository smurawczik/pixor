import styled from "styled-components";
import { Canvas } from "../Canvas";
import { CanvasPalette } from "../CanvasPalette/CanvasPalette";
import { CanvasTools } from "../CanvasTools";
import { DimensionsDialog } from "../DimensionsDialog";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px;
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
