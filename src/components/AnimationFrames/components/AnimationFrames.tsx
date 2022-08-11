import styled from "styled-components";
import { AddFrameButton } from "./AddFrameButton";
import { DuplicateFrameButton } from "./DuplicateFrameButton";
import { Frames } from "./Frames";

const StyledAnimationFrames = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-left: 2px solid indigo;
`;

const StyledFrameButtons = styled.div`
  display: flex;
`;

export const AnimationFrames = () => {
  return (
    <StyledAnimationFrames>
      <StyledFrameButtons>
        <AddFrameButton />
        <DuplicateFrameButton />
      </StyledFrameButtons>
      <Frames />
    </StyledAnimationFrames>
  );
};
