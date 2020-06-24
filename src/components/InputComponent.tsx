import React from "react";
import { View, KeyboardType } from "react-native";
import { PrimaryText, PrimaryTextInput } from "../components/BasicElements";

interface OwnProps {
  label: string;
  keyboardType?: KeyboardType;
  maxlength?: number;
}

const LoginComponent = (props: OwnProps) => {
  return (
    <View style={{ padding: 25 }}>
      <PrimaryText>{props.label}</PrimaryText>
      <PrimaryTextInput
        style={{ marginTop: 10 }}
        keyboardType={props.keyboardType}
        maxLength={props.maxlength}
        {...props}
      />
    </View>
  );
};

export default LoginComponent;
