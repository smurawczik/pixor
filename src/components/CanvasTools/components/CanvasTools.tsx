import { ToolsEnum } from "../../../redux/tools/tools.types";
import { CanvasTool } from "./CanvasTool";
import { ColorPicker } from "./ColorPicker";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BackspaceIcon from "@mui/icons-material/Backspace";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const EditingTools = styled.div`
  display: grid;
  grid-template-columns: 40px 40px;
  gap: 10px;
  justify-content: center;

  @media (min-width: ${LARGE_PC_BREAKPOINT}) {
    grid-template-columns: 60px 60px;
    grid-template-rows: 60px 60px;
  }
`;

export const CanvasTools = () => {
  return (
    <>
      <Typography gutterBottom variant="h6" sx={{ mt: 2, alignSelf: "start" }}>
        Tools
      </Typography>
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
        <CanvasTool size="small" tool={ToolsEnum.CLEAR}>
          <HighlightOffIcon />
        </CanvasTool>
        <CanvasTool size="small" tool={ToolsEnum.LINE}>
          <HorizontalRuleIcon
            sx={{ transform: "rotate(-45deg) scale(1.5, 1.5)" }}
          />
        </CanvasTool>
        <ColorPicker />
      </EditingTools>
    </>
  );
};
