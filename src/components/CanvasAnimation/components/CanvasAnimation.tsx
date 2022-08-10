import styled from "styled-components";
import { AnimationControllers } from "../../AnimationControllers";
import { AnimationFrames } from "../../AnimationFrames";

const StyledCanvasAnimation = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const CanvasAnimation = () => {
  return (
    <StyledCanvasAnimation>
      <AnimationControllers />
      <AnimationFrames />
    </StyledCanvasAnimation>
  );
};
