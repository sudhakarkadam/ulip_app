import React from "react";
import styled from "styled-components/native";
import variants from "./StyledButton.variants";
import { Text, StyledActivityIndicator } from "../BaseElements";
import {
  space,
  color,
  layout,
  border,
  typography,
  compose
} from "styled-system";
import colors from "../../../theme/colors";
import { FlexRowPlaceMiddle } from "../Flex";

const ButtonElem = styled.TouchableOpacity(
  compose(space, color, layout, border, typography),
  variants.type
);

const StyledButton = ({
  title,
  variant,
  appearance,
  loading,
  ...rest
}: any) => {
  return (
    <ButtonElem variant={variant} appearance={appearance} {...rest}>
      <FlexRowPlaceMiddle>
        <Text
          fontWeight={"bold"}
          textAlign={"center"}
          color={variant !== "default" ? appearance : rest.color || "white"}
          style={{ textTransform: "uppercase" }}
        >
          {title}
        </Text>
        {loading && (
          <StyledActivityIndicator
            color={variant !== "default" ? appearance : rest.color || "white"}
            size={15}
            marginLeft={3}
          />
        )}
      </FlexRowPlaceMiddle>
    </ButtonElem>
  );
};

StyledButton.defaultProps = {
  variant: "default",
  appearance: colors.primary
};

export default StyledButton;
