import React from "react";
import { View, TextInputProps } from "react-native";
import {
  PrimaryTextInput,
  UpperCasePrimaryText
} from "../components/BasicElements";

interface OwnProps {
  label: string;
}

const InputComponent = (props: OwnProps & TextInputProps) => {
  return (
    <View>
      <UpperCasePrimaryText>{props.label}</UpperCasePrimaryText>
      <PrimaryTextInput style={{ marginTop: 10 }} {...props} />
    </View>
  );
};

export default InputComponent;
