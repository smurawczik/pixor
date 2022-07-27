import { Box, TextField } from "@mui/material";
import { canvasSelectors } from "../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const DimensionsDialog = () => {
  const dispatch = useAppDispatch();
  const dimensions = useAppSelector(canvasSelectors.dimensions);

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        type="number"
        placeholder="width"
        value={dimensions.width}
        variant="outlined"
        onChange={(event) => {
          const value = parseInt(event.target.value);

          if (value <= 0) event.preventDefault();
          else dispatch(canvasActions.setWidth(value));
        }}
        sx={{ mb: 2 }}
        label="width"
      />
      <TextField
        type="number"
        placeholder="height"
        value={dimensions.height}
        variant="outlined"
        onChange={(event) => {
          const value = parseInt(event.target.value);

          if (value <= 0) event.preventDefault();
          else dispatch(canvasActions.setHeight(value));
        }}
        label="height"
      />
    </Box>
  );
};
