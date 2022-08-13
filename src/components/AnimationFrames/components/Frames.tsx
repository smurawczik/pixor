import { Box } from "@mui/material";
import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { useAppSelector } from "../../../redux/hooks";
import { Frame } from "./Frame";

export const Frames = () => {
  const frames = useAppSelector(animationSelectors.frames);

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "auto",
        maxWidth: "calc(100% - 220px)",
      }}
    >
      {frames.map((frame) => (
        <Frame key={frame.id} frame={frame} />
      ))}
    </Box>
  );
};
