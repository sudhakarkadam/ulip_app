import React from "react";
import { View, TextInputProps } from "react-native";
import {
  PrimaryTextInput,
  UpperCasePrimaryText
} from "../components/BasicElements";

interface OwnProps {
  label?: string;
}

const InputComponent = (props: OwnProps & TextInputProps) => {
  return (
    <View>
      <UpperCasePrimaryText style={{ marginBottom: 10 }}>
        {props.label}
      </UpperCasePrimaryText>
      <PrimaryTextInput {...props} />
    </View>
  );
};

export default InputComponent;
