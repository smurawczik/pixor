import { BucketTool } from "./BucketTool";
import { ColorPicker } from "./ColorPicker";
import { EraserTool } from "./EraserTool";
import { PencilTool } from "./PencilTool";

export const CanvasTools = () => {
  return (
    <div>
      <PencilTool />
      <EraserTool />
      <BucketTool />
      <ColorPicker />
    </div>
  );
};
