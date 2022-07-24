import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toolsSelectors } from "../../../redux/tools/tools.selectors";
import { toolsActions } from "../../../redux/tools/tools.slice";
import { ToolsEnum } from "../../../redux/tools/tools.types";
import { SelectedToolButton } from "./SelectedTool";

export const CanvasTool: FC<{
  tool: ToolsEnum;
  children?: React.ReactNode;
}> = ({ tool, children }) => {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(toolsSelectors.isToolSelected(tool));
  return (
    <SelectedToolButton
      isSelected={isSelected}
      onClick={() => dispatch(toolsActions.selectTool(tool))}
    >
      {children}
    </SelectedToolButton>
  );
};
