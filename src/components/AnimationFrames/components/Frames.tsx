import { animationSelectors } from "../../../redux/animation/animation.selectors";
import { useAppSelector } from "../../../redux/hooks";
import { Frame } from "./Frame";

export const Frames = () => {
  const frames = useAppSelector(animationSelectors.frames);

  return (
    <div>
      {frames.map((frame) => (
        <Frame key={frame.id} frame={frame} />
      ))}
    </div>
  );
};
