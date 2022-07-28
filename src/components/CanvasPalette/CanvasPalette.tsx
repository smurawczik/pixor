import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";
import { canvasSelectors } from "../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const StyledColor = styled.div<{ paletteColor: string; isSelected: boolean }>`
  background-color: ${(props) => props.paletteColor};
  width: 40px;
  height: 40px;
  transition: all 0.3s;
  ${({ isSelected }) => (isSelected ? "border: 2px inset indigo;" : "")}

  :hover {
    border: 2px inset indigo;
  }
`;

export const CanvasPalette = () => {
  const dispatch = useAppDispatch();
  const allColors = useAppSelector(canvasSelectors.getAllColors);
  const currentColor = useAppSelector(canvasSelectors.currentColor);

  const selectColor = useCallback(
    (color: string) => () => {
      dispatch(canvasActions.changeColor(color));
    },
    [dispatch]
  );

  return (
    <>
      <Typography gutterBottom variant="h6">
        Palette
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {allColors.map((color) => (
          <StyledColor
            key={color}
            paletteColor={color}
            onClick={selectColor(color)}
            isSelected={color === currentColor}
          />
        ))}
      </Box>
    </>
  );
};
