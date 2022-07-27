import { Button } from "@mui/material";
import styled from "styled-components";

export const ToolButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => !["isSelected"].includes(prop),
})<{ isSelected: boolean }>`
  && {
    box-shadow: 0 0 0 2px
      ${({ isSelected, theme }) =>
        isSelected ? theme.colors.primary : "transparent"};
  }
`;
