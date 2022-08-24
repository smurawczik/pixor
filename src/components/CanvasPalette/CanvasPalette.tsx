import { Box, styled, Typography } from "@mui/material";
import { useCallback } from "react";
import { LARGE_PC_BREAKPOINT } from "../../constants";
import { canvasSelectors } from "../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const StyledColor = styled("div", {
  shouldForwardProp: (prop: string) =>
    !["paletteColor", "isSelected"].includes(prop),
})<{
  paletteColor: string;
  isSelected: boolean;
}>`
  background-color: ${(props) => props.paletteColor};
  width: 20px;
  height: 20px;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 100%;
  ${({ isSelected, theme }) =>
    isSelected
      ? `box-shadow: 0 0 0 3px ${theme.palette.secondary.light};`
      : "box-shadow: 0 0 0 3px rgba(255,255,255,0.65);"}

  :hover {
    ${({ theme, isSelected }) =>
      isSelected
        ? `box-shadow: 0 0 0 3px ${theme.palette.secondary.light};`
        : `box-shadow: 0 0 0 2px ${theme.palette.primary.light}, 0 0 0 3px ${theme.palette.secondary.light};`}
  }

  @media (min-width: ${LARGE_PC_BREAKPOINT}) {
    width: 40px;
    height: 40px;
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
      <Box display="flex" flexWrap="wrap" gap={1.5}>
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
