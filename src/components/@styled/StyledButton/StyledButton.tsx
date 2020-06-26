import React from "react";
import styled from "styled-components/native";
import variants from "./StyledButton.variants";
import { Text } from "../BaseElements";
import {
  space,
  color,
  layout,
  border,
  typography,
  compose
} from "styled-system";
import colors from "../../../theme/colors";

const ButtonElem = styled.TouchableOpacity(
  compose(
    space,
    color,
    layout,
    border,
    typography
  ),
  variants.type
);

const StyledButton = ({ title, variant, appearance, ...rest }: any) => {
  return (
    <ButtonElem variant={variant} appearance={appearance} {...rest}>
      <Text
        fontWeight={"bold"}
        textAlign={"center"}
        color={variant !== "default" ? appearance : rest.color || "white"}
        style={{ textTransform: "uppercase" }}
      >
        {title}
      </Text>
    </ButtonElem>
  );
};

StyledButton.defaultProps = {
  variant: "default",
  appearance: colors.primary
};

export default StyledButton;
