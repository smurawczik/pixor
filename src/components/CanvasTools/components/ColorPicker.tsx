import { Button } from "@mui/material";
import { throttle } from "lodash";
import { useRef } from "react";
import styled from "styled-components";
import { LARGE_PC_BREAKPOINT } from "../../../constants";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const StyledInputColor = styled(Button)`
  && {
    width: 40px;
    height: 40px;
    min-width: auto;

    @media (min-width: ${LARGE_PC_BREAKPOINT}) {
      width: 60px;
      height: 60px;
    }

    input[type="color"] {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;

export const ColorPicker = () => {
  const dispatch = useAppDispatch();
  const currentColor = useAppSelector(canvasSelectors.currentColor);

  const throttleColorChange = useRef(
    throttle((nextValue) => dispatch(canvasActions.changeColor(nextValue)), 20)
  ).current;

  return (
    <StyledInputColor
      sx={{
        backgroundColor: currentColor,
        "&:hover": {
          backgroundColor: currentColor,
        },
      }}
    >
      <input
        type="color"
        value={currentColor}
        onChange={(event) => throttleColorChange(event.currentTarget.value)}
      />
    </StyledInputColor>
  );
};
