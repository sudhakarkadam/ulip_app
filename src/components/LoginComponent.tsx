import React, { useState } from "react";
import { Flex, TouchableOpacity, Box } from "./@styled/BaseElements";
import { Text, TextInput } from "react-native";
import colors from "../theme/colors";
import Logo from "../images/group.svg";
import BackBtn from "../images/arrow-left-circle.svg";
import StyledButton from "../components/@styled/StyledButton";
import CodeInput from "../components/CodeInput";
import { PrimaryText } from "../components/@styled/Text";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../actions/ActionCreators";
import { TranslationText } from "./InternationalisationProvider";
const { verifyOtp, sendOtp } = ActionCreators;

const mapDispatchToProps = { verifyOtp, sendOtp };
const connector = connect(null, mapDispatchToProps);

const LoginComponent = (props: ConnectedProps<typeof connector>) => {
  const [phoneNumber, editPhoneNumber] = useState("");
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [otpConfirmed] = useState(false);

  return (
    <Flex flex={1}>
      <Box mx={6} mt={80}>
        <Logo width={300} height={66} />
      </Box>

      <Flex mx={6} flex={1} mt={10}>
        {!phoneConfirmed && (
          <Flex>
            <PrimaryText style={{ textTransform: "uppercase" }}>
              <TranslationText id="mobile.number" />
            </PrimaryText>
            <Flex
              style={{
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
                <TranslationText id="india.prefix" />
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
                <PrimaryText fontSize={3}>
                  <TranslationText id="otp.sent" />
                </PrimaryText>
                <PrimaryText fontSize={6}>
                  <TranslationText
                    id="placeholder"
                    interpolations={{ value: phoneNumber }}
                  />
                </PrimaryText>
                <CodeInput
                  activeColor={colors.primary}
                  inactiveColor={colors.primary}
                  inputPosition="center"
                  size={42}
                  space={6}
                  codeLength={6}
                  onFulfill={async code => {
                    await props.verifyOtp({ otp: code, phone: phoneNumber });
                    return Promise.resolve(true);
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
              <TranslationText
                id="otp.verified"
                interpolations={{ phoneNumber }}
              />
            )}
          </Flex>
        )}
      </Flex>
      <Flex style={{ justifyContent: "flex-end" }}>
        {phoneNumber.length === 10 && !phoneConfirmed && (
          <Flex style={{ paddingBottom: 10 }} mx={6}>
            <StyledButton
              title={<TranslationText id="confirm" />}
              onPress={async () => {
                await props.sendOtp({ phone: phoneNumber });
                setPhoneConfirmed(true);
              }}
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

export default connector(LoginComponent);
