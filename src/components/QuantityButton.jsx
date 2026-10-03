import styled from "styled-components";

// Bare icon button for the + / − quantity controls.
const QuantityButton = styled.button.attrs({ type: "button" })`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  padding: 0;

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

export default QuantityButton;
