import styled from "styled-components";
import { AddFrameButton } from "./AddFrameButton";
import { Frames } from "./Frames";

const StyledAnimationFrames = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const AnimationFrames = () => {
  return (
    <StyledAnimationFrames>
      <AddFrameButton />
      <Frames />
    </StyledAnimationFrames>
  );
};
