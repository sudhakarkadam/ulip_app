import React, { useState, useContext, useEffect } from "react";
import { Flex, Box, Image } from "./@styled/BaseElements";
import { Text, TextInput, ToastAndroid } from "react-native";
import colors from "../theme/colors";
import Logo from "../images/logo.png";
import StyledButton from "../components/@styled/StyledButton";
import CodeInput from "../components/CodeInput";
import {
  PrimaryText,
  PrimaryTextSmall,
  PrimaryHeaderText,
  SecondaryText,
  SecondaryLabel,
  PrimaryLabel
} from "../components/@styled/Text";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../actions/ActionCreators";
import { TranslationText, I18nContext } from "./InternationalisationProvider";
import { Page } from "./@styled/Page";
import { CommonState } from "../reducers/index";

const { verifyOtp, sendOtp, resendOtp } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  user: state.user
});
const mapDispatchToProps = { verifyOtp, sendOtp, resendOtp };
const connector = connect(mapStateToProps, mapDispatchToProps);

const LoginComponent = (props: ConnectedProps<typeof connector>) => {
  const [phoneNumber, editPhoneNumber] = useState("");
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [resendCycle, setResendCycle] = useState(-1); // -1: hasn't started. 0: started 30s timer. 1: Show resend

  const [otpConfirmed] = useState(false);
  const verificationID = props.user.data.verification_id || "";
  const { translate } = useContext(I18nContext);

  useEffect(() => {
    if (resendCycle === 0) {
      const timer = setTimeout(() => {
        setResendCycle(1);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [resendCycle]);

  const resend = async () => {
    let toastMsg = translate("otp.resent");
    try {
      await props.resendOtp(verificationID);
      setResendCycle(0);
    } catch {
      toastMsg = translate("otp.resend.failed");
    } finally {
      ToastAndroid.show(toastMsg, ToastAndroid.SHORT);
    }
  };

  return (
    <Page bg={colors.white}>
      <Flex flex={1}>
        <Box mx={6} mt={80} alignItems={"center"}>
          <Image source={Logo} />
          <PrimaryText pt={5}>UNIFIED LOGISTICS INTERFACE PLATFORM</PrimaryText>
        </Box>

        <Flex mx={6} flex={1} mt={10}>
          {!phoneConfirmed && (
            <Flex mt={6}>
              <PrimaryLabel style={{ textTransform: "uppercase" }}>
                <TranslationText id="mobile.number" />
              </PrimaryLabel>
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
            <Flex alignItems="center" mt={5} justifyContent={"space-evenly "}>
              {!otpConfirmed && (
                <>
                  <PrimaryText>
                    <TranslationText id="otp.sent" />
                  </PrimaryText>
                  <PrimaryHeaderText mt={3}>
                    <TranslationText
                      id="placeholder"
                      interpolations={{ value: phoneNumber }}
                    />
                  </PrimaryHeaderText>
                  <CodeInput
                    activeColor={colors.primary}
                    inactiveColor={colors.primary}
                    inputPosition="center"
                    size={42}
                    space={6}
                    codeLength={6}
                    onFulfill={async code => {
                      try {
                        await props.verifyOtp({
                          otp: code,
                          phone: phoneNumber,
                          verification_id: verificationID
                        });
                        return Promise.resolve(true);
                      } catch (err) {
                        ToastAndroid.show(
                          `Error while logging in: ${err}`,
                          ToastAndroid.SHORT
                        );
                        return Promise.resolve(false);
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
                  <SecondaryLabel mt={55} mx={10}>
                    <TranslationText id="accept.terms" />
                  </SecondaryLabel>
                  {resendCycle == 1 && (
                    <SecondaryText mt={50} mx={10}>
                      <TranslationText id="otp.not.received" />
                      {` `}
                      <PrimaryText onPress={resend}>
                        <TranslationText id="resend" />
                      </PrimaryText>
                    </SecondaryText>
                  )}
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
                  try {
                    await props.sendOtp({ phone: phoneNumber });
                    setPhoneConfirmed(true);
                    setResendCycle(0);
                  } catch (err) {
                    ToastAndroid.show(
                      `Error while sending OTP: ${err}`,
                      ToastAndroid.SHORT
                    );
                  }
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
    </Page>
  );
};

export default connector(LoginComponent);
