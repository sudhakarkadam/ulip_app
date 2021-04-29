import React from "react";
import { TextInputProps } from "react-native";
import { PrimaryLabel } from "./@styled/Text";
import { StyledTextInput, Box } from "./@styled/BaseElements";

interface OwnProps {
  label?: string;
}

const InputComponent = (props: OwnProps & TextInputProps) => {
  return (
    <Box mb={5}>
      {props.label && <PrimaryLabel mb={4}>{props.label}</PrimaryLabel>}
      <StyledTextInput {...props} />
    </Box>
  );
};

export default InputComponent;
