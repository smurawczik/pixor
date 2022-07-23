import styled from "styled-components";

export const SelectedToolButton = styled.button<{ isSelected: boolean }>`
  outline: 1px solid ${(props) => (props.isSelected ? "red" : "inherit")};
  margin: ${(props) => (props.isSelected ? "1px" : "inherit")};
`;
