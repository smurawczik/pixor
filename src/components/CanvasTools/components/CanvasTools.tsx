import { ToolsEnum } from "../../../redux/tools/tools.types";
import { CanvasTool } from "./CanvasTool";
import { ColorPicker } from "./ColorPicker";

export const CanvasTools = () => {
  return (
    <div>
      <CanvasTool tool={ToolsEnum.PENCIL}>Pencil</CanvasTool>
      <CanvasTool tool={ToolsEnum.ERASER}>Eraser</CanvasTool>
      <CanvasTool tool={ToolsEnum.BUCKET}>Bucket</CanvasTool>
      <ColorPicker />
    </div>
  );
};
