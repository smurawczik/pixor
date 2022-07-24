import { IconButton } from "@mui/material";
import styled from "styled-components";

export const ToolButton = styled(IconButton)<{ isSelected: boolean }>`
  && {
    box-shadow: 0 0 0 1px
      ${({ isSelected, theme }) =>
        isSelected ? theme.colors.primary : "transparent"};
  }
`;
