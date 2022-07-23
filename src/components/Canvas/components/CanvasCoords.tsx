import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { useAppSelector } from "../../../redux/hooks";

export const CanvasCoords = () => {
  const { x, y } = useAppSelector(canvasSelectors.coordinates);

  return (
    <div>
      <span>
        x: <b>{x ? x : "-"}</b>
      </span>
      <span>
        y: <b>{y ? y : "-"}</b>
      </span>
    </div>
  );
};
