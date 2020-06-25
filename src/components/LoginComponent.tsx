import React, { useState } from "react";
import { Image, TouchableNativeFeedback, View } from "react-native";
import { FlexColumn, Flex } from "./@styled/BaseElements";
import colors from "../theme/colors";
import {
  PrimaryText,
  PrimaryTouchable,
  UpperCasePrimaryText
} from "./BasicElements";
import Input from "../components/InputComponent";
import CodeInput from "../components/CodeInput";

const Back = require("../icons/back.png");

const BackArrow = () => (
  <FlexColumn
    style={{
      backgroundColor: `${colors.primary}`,
      height: 30,
      width: 30,
      borderRadius: 30,
      alignItems: "center"
    }}
  >
    <Image source={Back} style={{ marginTop: 2, height: 25, width: 25 }} />
  </FlexColumn>
);

const LoginComponent = () => {
  const [phoneNumber, editPhoneNumber] = useState("");
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [otpConfirmed, setOtpConfimation] = useState(false);

  return (
    <FlexColumn
      style={{
        flex: 1,
        marginLeft: 25,
        marginRight: 70
      }}
    >
      {phoneConfirmed && !otpConfirmed && (
        <TouchableNativeFeedback onPress={() => setPhoneConfirmed(false)}>
          <View style={{ marginTop: 30 }}>
            <BackArrow />
          </View>
        </TouchableNativeFeedback>
      )}
      <FlexColumn style={{ flex: 1, justifyContent: "center" }}>
        <UpperCasePrimaryText style={{ fontWeight: "bold", marginBottom: 100 }}>
          unified logistics interface platform
        </UpperCasePrimaryText>
        {!phoneConfirmed && (
          <>
            <Input
              label="mobile number"
              keyboardType="numeric"
              maxLength={10}
              value={phoneNumber}
              onChangeText={text => editPhoneNumber(text)}
              style={{ marginBottom: 10 }}
            />
            {phoneNumber.length === 10 && (
              <Flex style={{ alignItems: "flex-end" }}>
                <PrimaryTouchable
                  label="Confirm"
                  touchableProps={{ onPress: () => setPhoneConfirmed(true) }}
                />
              </Flex>
            )}
          </>
        )}
        {phoneConfirmed && (
          <FlexColumn style={{ alignItems: "center" }}>
            {!otpConfirmed && (
              <>
                <PrimaryText>A OTP has been sent to</PrimaryText>
                <PrimaryText style={{ fontWeight: "bold" }}>
                  {phoneNumber}
                </PrimaryText>
                <CodeInput
                  activeColor={colors.primary}
                  inactiveColor={colors.primary}
                  inputPosition="center"
                  size={36}
                  space={15}
                  codeLength={6}
                  onFulfill={code => {
                    if (code === "121122") {
                      setOtpConfimation(true);
                      return Promise.resolve(true);
                    } else {
                      setOtpConfimation(false);
                      return Promise.reject(false);
                    }
                  }}
                  codeInputStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    fontSize: 18
                  }}
                  keyboardType="numeric"
                />
              </>
            )}
            {otpConfirmed && (
              <PrimaryText>
                OTP Successfully Verified for {phoneNumber}
              </PrimaryText>
            )}
          </FlexColumn>
        )}
      </FlexColumn>
    </FlexColumn>
  );
};

export default LoginComponent;
