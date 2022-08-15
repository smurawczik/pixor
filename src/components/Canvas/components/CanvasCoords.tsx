import { Box } from "@mui/system";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { useAppSelector } from "../../../redux/hooks";

export const CanvasCoords = () => {
  const { x, y } = useAppSelector(canvasSelectors.coordinates);

  return (
    <div>
      <span>
        x: <b>{x ? (x < 10 ? "0" + x : x) : "00"}</b>
      </span>
      <Box sx={{ mx: 1, display: "inline-block" }} />
      <span>
        y: <b>{y ? (y < 10 ? "0" + y : y) : "00"}</b>
      </span>
    </div>
  );
};
