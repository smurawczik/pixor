import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toolsSelectors } from "../../../redux/tools/tools.selectors";
import { toolsActions } from "../../../redux/tools/tools.slice";
import { ToolsEnum } from "../../../redux/tools/tools.types";
import { SelectedToolButton } from "./SelectedTool";

export const PencilTool = () => {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(toolsSelectors.isPencilSelected);

  return (
    <SelectedToolButton
      isSelected={isSelected}
      onClick={() => dispatch(toolsActions.selectTool(ToolsEnum.PENCIL))}
    >
      PENCIL
    </SelectedToolButton>
  );
};
