import styled from "styled-components";
import { PlayPause } from "./PlayPause";

const StyledAnimationControllers = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const AnimationControllers = () => {
  return (
    <StyledAnimationControllers>
      <PlayPause />
    </StyledAnimationControllers>
  );
};
