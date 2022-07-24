import { ToolsEnum } from "../../../redux/tools/tools.types";
import { CanvasTool } from "./CanvasTool";
import { ColorPicker } from "./ColorPicker";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BackspaceIcon from "@mui/icons-material/Backspace";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import styled from "styled-components";

const EditingTools = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: auto;
`;

export const CanvasTools = () => {
  return (
    <div>
      <div>
        <EditingTools>
          <CanvasTool size="small" tool={ToolsEnum.PENCIL}>
            <BorderColorIcon />
          </CanvasTool>
          <CanvasTool size="small" tool={ToolsEnum.ERASER}>
            <BackspaceIcon />
          </CanvasTool>
          <CanvasTool size="small" tool={ToolsEnum.BUCKET}>
            <FormatColorFillIcon />
          </CanvasTool>
          <CanvasTool size="small" tool={ToolsEnum.BLUR}>
            <BlurOnIcon />
          </CanvasTool>
        </EditingTools>
      </div>
      <ColorPicker />
    </div>
  );
};
