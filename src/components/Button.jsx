import { Link } from "react-router";
import styled, { css } from "styled-components";
import { mobile } from "../responsive";
import { colors } from "../theme";

const variants = {
  // Solid black; navy on hover.
  filled: css`
    background-color: ${colors.ink};
    border-color: ${colors.ink};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${colors.navy};
      border-color: ${colors.navy};
    }
  `,
  // Black outline that fills black on hover.
  outline: css`
    background-color: transparent;
    border-color: ${colors.ink};
    color: ${colors.ink};

    &:hover:not(:disabled) {
      background-color: ${colors.ink};
      color: white;
    }
  `,
  // Brand blue, used on the account forms.
  accent: css`
    background-color: ${colors.brand};
    border-color: ${colors.brand};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${colors.navy};
      border-color: ${colors.navy};
    }
  `,
};

const sizes = {
  sm: css`
    font-size: 13px;
    padding: 10px 14px;
  `,
  md: css`
    font-size: 15px;
    padding: 12px 22px;
  `,
  lg: css`
    font-size: 20px;
    padding: 10px 18px;
    ${mobile({ fontSize: "16px" })}
  `,
};

// Shared button. Props: $variant ("filled" | "outline" | "accent"),
// $size ("sm" | "md" | "lg") and $fullWidth. Use <ButtonLink to="..."> for
// navigation, so it's a real link with the same look.
const Button = styled.button`
  align-items: center;
  border: 2px solid;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  gap: 8px;
  justify-content: center;
  letter-spacing: 0.5px;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  ${(props) => variants[props.$variant ?? "outline"]}
  ${(props) => sizes[props.$size ?? "md"]}

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export const ButtonLink = (props) => <Button as={Link} {...props} />;

export default Button;
