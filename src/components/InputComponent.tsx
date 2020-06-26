import React from "react";
import { View, TextInputProps } from "react-native";
import { PrimaryText } from "./@styled/Text";
import { StyledTextInput } from "./@styled/BaseElements";

interface OwnProps {
  label?: string;
}

const InputComponent = (props: OwnProps & TextInputProps) => {
  return (
    <View>
      <PrimaryText mb={4} style={{ textTransform: "uppercase" }}>
        {props.label}
      </PrimaryText>
      <StyledTextInput {...props} />
    </View>
  );
};

export default InputComponent;
