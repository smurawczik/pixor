import styled from "styled-components";
import { AnimationControllers } from "../../AnimationControllers";
import { AnimationFrames } from "../../AnimationFrames";

const StyledCanvasAnimation = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

export const CanvasAnimation = () => {
  return (
    <StyledCanvasAnimation>
      <AnimationControllers />
      <AnimationFrames />
    </StyledCanvasAnimation>
  );
};
