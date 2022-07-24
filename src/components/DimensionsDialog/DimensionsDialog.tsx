import { Input } from "@mui/material";
import { canvasSelectors } from "../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const DimensionsDialog = () => {
  const dispatch = useAppDispatch();
  const dimensions = useAppSelector(canvasSelectors.dimensions);

  return (
    <div>
      <Input
        type="number"
        placeholder="width"
        value={dimensions.width}
        onChange={(event) => {
          const value = parseInt(event.target.value);

          if (value <= 0) event.preventDefault();
          else dispatch(canvasActions.setWidth(value));
        }}
      />
      <Input
        type="number"
        placeholder="height"
        value={dimensions.height}
        onChange={(event) => {
          const value = parseInt(event.target.value);

          if (value <= 0) event.preventDefault();
          else dispatch(canvasActions.setHeight(value));
        }}
      />
    </div>
  );
};
