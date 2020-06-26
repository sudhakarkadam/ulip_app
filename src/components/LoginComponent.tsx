import React, { useState } from "react";
import { Flex, TouchableOpacity } from "./@styled/BaseElements";
import colors from "../theme/colors";
import Logo from "../images/group.svg";
import BackBtn from "../images/arrow-left-circle.svg";
import StyledButton from "../components/@styled/StyledButton";
import Input from "../components/InputComponent";
import CodeInput from "../components/CodeInput";
import { PrimaryText } from "../components/@styled/Text";

const LoginComponent = () => {
  const [phoneNumber, editPhoneNumber] = useState("");
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [otpConfirmed, setOtpConfimation] = useState(false);

  return (
    <Flex mx={6} flex={1}>
      {phoneConfirmed && !otpConfirmed && (
        <TouchableOpacity my={30} onPress={() => setPhoneConfirmed(false)}>
          <BackBtn width={32} height={32} />
        </TouchableOpacity>
      )}
      <Flex flex={1} justifyContent="space-evenly">
        <Logo width={300} height={66} />
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
              <Flex alignItems="flex-end">
                <StyledButton
                  title="confirm"
                  onPress={() => {
                    setPhoneConfirmed(true);
                  }}
                />
              </Flex>
            )}
          </>
        )}
        {phoneConfirmed && (
          <Flex alignItems="center">
            {!otpConfirmed && (
              <>
                <PrimaryText fontSize={3}>A OTP has been sent to</PrimaryText>
                <PrimaryText fontSize={6}>{phoneNumber}</PrimaryText>
                <CodeInput
                  activeColor={colors.primary}
                  inactiveColor={colors.primary}
                  inputPosition="center"
                  size={42}
                  space={6}
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
                    fontSize: 18,
                    backgroundColor: colors.grays[2],
                    borderRadius: 3
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
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default LoginComponent;
