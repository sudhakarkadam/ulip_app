import React from "react";
import styled from "styled-components/native";
import variants from "./StyledButton.variants";
import { space, color, layout, border, compose } from "styled-system";

const ButtonElem = styled.Button(
  compose(
    space,
    color,
    layout,
    border,
    variants.size
  ),
  variants.type
);

const StyledButton = ({ variant, size, appearance, ...rest }: any) => {
  console.log(rest);
  return (
    <ButtonElem
      variant={variant}
      size={size}
      appearance={appearance}
      {...rest}
    />
  );
};

StyledButton.defaultProps = {
  variant: "default",
  size: "medium",
  appearance: "primary"
};

export default StyledButton;
