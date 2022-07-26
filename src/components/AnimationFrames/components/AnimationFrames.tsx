import { styled } from "@mui/material";
import { AddFrameButton } from "./AddFrameButton";
import { DuplicateFrameButton } from "./DuplicateFrameButton";
import { Frames } from "./Frames";

const StyledAnimationFrames = styled("div")`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  border-left: 2px solid ${({ theme }) => theme.palette.primary.light};
  width: 100%;
`;

const StyledFrameButtons = styled("div")`
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
