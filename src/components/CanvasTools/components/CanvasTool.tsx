import { IconButtonProps, Tooltip } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toolsSelectors } from "../../../redux/tools/tools.selectors";
import { toolsActions } from "../../../redux/tools/tools.slice";
import { ToolsEnum } from "../../../redux/tools/tools.types";
import { ToolButton } from "./ToolButton";

interface CanvasToolProps extends IconButtonProps {
  tool: ToolsEnum;
  children?: React.ReactNode;
}

export const CanvasTool: FC<CanvasToolProps> = ({ tool, children }) => {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(toolsSelectors.isToolSelected(tool));
  return (
    <Tooltip title={tool}>
      <ToolButton
        isSelected={isSelected}
        onClick={() => dispatch(toolsActions.selectTool(tool))}
      >
        {children}
      </ToolButton>
    </Tooltip>
  );
};
