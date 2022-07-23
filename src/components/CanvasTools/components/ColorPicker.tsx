import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

export const ColorPicker = () => {
  const dispatch = useAppDispatch();
  const currentColor = useAppSelector(canvasSelectors.currentColor);

  return (
    <input
      type="color"
      value={currentColor}
      onChange={(event) =>
        dispatch(canvasActions.changeColor(event.currentTarget.value))
      }
    />
  );
};
