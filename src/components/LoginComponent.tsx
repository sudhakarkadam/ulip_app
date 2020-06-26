import React, { useState } from "react";
import { Flex, TouchableOpacity } from "./@styled/BaseElements";
import { Text, TextInput } from "react-native";
import colors from "../theme/colors";
import Logo from "../images/group.svg";
import BackBtn from "../images/arrow-left-circle.svg";
import StyledButton from "../components/@styled/StyledButton";
import CodeInput from "../components/CodeInput";
import { PrimaryText } from "../components/@styled/Text";

interface OwnProps {
  getUserInfo: (otp: string) => Promise<any>;
}

const LoginComponent = (props: OwnProps) => {
  const [phoneNumber, editPhoneNumber] = useState("");
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [otpConfirmed] = useState(false);

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
          <Flex>
            <PrimaryText style={{ textTransform: "uppercase" }}>
              Mobile Number
            </PrimaryText>
            <Flex
              style={{
                height: 50,
                width: 300,
                borderRadius: 5,
                paddingLeft: 12,
                paddingRight: 15,
                marginTop: 5,
                borderColor: colors.grays[1],
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 18, color: colors.primary }}>
                +91 -{" "}
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={10}
                value={phoneNumber}
                onChangeText={text => editPhoneNumber(text)}
                style={{
                  fontSize: 18,
                  color: colors.primary,
                  display: "flex",
                  flex: 1
                }}
              />
            </Flex>
          </Flex>
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
                  onFulfill={code => props.getUserInfo(code)}
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
      <Flex style={{ justifyContent: "flex-end" }}>
        {phoneNumber.length === 10 && !phoneConfirmed && (
          <Flex style={{ paddingBottom: 10 }}>
            <StyledButton
              title="Confirm"
              onPress={() => setPhoneConfirmed(true)}
              style={{
                textAlign: "center",
                color: `${colors.white}`,
                textTransform: "uppercase",
                fontSize: 16
              }}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default LoginComponent;
