import { useCallback } from "react";
import styled from "styled-components";
import { canvasSelectors } from "../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const StyledColor = styled.div<{ paletteColor: string }>`
  background-color: ${(props) => props.paletteColor};
  width: 15px;
  height: 15px;
  border-radius: 100%;
`;

export const CanvasPalette = () => {
  const dispatch = useAppDispatch();
  const allColors = useAppSelector(canvasSelectors.getAllColors);

  const selectColor = useCallback(
    (color: string) => () => {
      dispatch(canvasActions.changeColor(color));
    },
    [dispatch]
  );

  return (
    <div>
      {allColors.map((color) => (
        <StyledColor
          key={color}
          paletteColor={color}
          onClick={selectColor(color)}
        />
      ))}
    </div>
  );
};
