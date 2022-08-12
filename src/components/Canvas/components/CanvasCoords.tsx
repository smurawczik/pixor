import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { useAppSelector } from "../../../redux/hooks";

export const CanvasCoords = () => {
  const { x, y } = useAppSelector(canvasSelectors.coordinates);

  return (
    <div>
      <div>
        x: <b>{x ? x : "-"}</b>
      </div>
      <div>
        y: <b>{y ? y : "-"}</b>
      </div>
    </div>
  );
};
