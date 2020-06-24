import React, { useState } from "react";
import Input from "../components/InputComponent";
import { View } from "react-native";
import { FlexVerticallyCenter } from "./@styled/BaseElements";
import { PrimaryText } from "./BasicElements";

const LoginComponent = () => {
  let phoneNumber;
  return (
    <View>
      <FlexVerticallyCenter>
        <PrimaryText style={{ fontWeight: "bold" }}>
          unified logistics interface platform
        </PrimaryText>
        <Input
          label="mobile number"
          keyboardType="numeric"
          maxlength={10}
          value={phoneNumber}
        />
      </FlexVerticallyCenter>
    </View>
  );
};

export default LoginComponent;
