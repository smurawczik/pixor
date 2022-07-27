import { Button } from "@mui/material";
import styled from "styled-components";
import { canvasSelectors } from "../../../redux/canvas/canvas.selectors";
import { canvasActions } from "../../../redux/canvas/canvas.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const StyledInputColor = styled(Button).withConfig({
  shouldForwardProp: (prop) => !["backgroundColor"].includes(prop),
})<{ backgroundColor: string }>`
  && {
    width: 40px;
    height: 40px;

    @media (min-width: 1280px) {
      width: 60px;
      height: 60px;
    }

    background-color: ${({ backgroundColor }) => backgroundColor};

    :hover {
      background-color: ${({ backgroundColor }) => backgroundColor};
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

  return (
    <StyledInputColor backgroundColor={currentColor}>
      <input
        type="color"
        value={currentColor}
        onChange={(event) =>
          dispatch(canvasActions.changeColor(event.currentTarget.value))
        }
      />
    </StyledInputColor>
  );
};
