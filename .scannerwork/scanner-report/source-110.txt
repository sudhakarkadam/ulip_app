import React, { useContext, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import styled from "styled-components/native";
import { View, Modal } from "react-native";
import { Text, Flex, FlexRow, FlexColumn, Box } from "./@styled/BaseElements";
import { TextWrapper } from "./@styled/Text";
import InfoIcon from "../images/info.svg";
import LoaderIcon from "../images/loader.svg";
import ErrorIcon from "../images/errorInfo.svg";
import TickIcon from "../images/tick.svg";
import { I18nContext, TranslationText } from "./InternationalisationProvider";
import StyledButton from "./@styled/StyledButton";
import Input from "./InputComponent";
import ActionCreators from "../actions/ActionCreators";
import { ToastAndroid } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TripStackList } from "../apps/LSP/components/LSPTripStack";

const { addEWayBill } = ActionCreators;
const connector = connect(null, { addEWayBill });
type EWayBillType = ConnectedProps<typeof connector>;

interface EWayBillCardProps {
  ewbNumber?: string;
  status?: string;
  valipUpto?: string;
  tripId?: number;
  navigation?: StackNavigationProp<TripStackList, "EWayBillGenerationPage">;
}

const ewayStatusProps = (ewayBillStatus: any) => {
  switch (ewayBillStatus) {
    case "IN_PROGRESS":
      return {
        backgroundColor: "rgba(255,204,0,0.1)",
        icon: <LoaderIcon />,
        text: "eway.loading" as "eway.loading",
        buttonText: "please.wait" as "please.wait",
        borderColor: "#FFCC00",
        disableBtn: true,
        onPress: () => {}
      };
    case "CREATED":
      return {
        backgroundColor: "rgba(54,179,126,0.1)",
        icon: <TickIcon />,
        text: "eway.success" as "eway.success",
        buttonText: null,
        borderColor: "#36B37E",
        disableBtn: true
      };
    case "ERROR":
      return {
        backgroundColor: "rgba(208,2,27,0.05)",
        icon: <ErrorIcon />,
        text: "eway.error" as "eway.error",
        buttonText: "try.again" as "try.again",
        borderColor: "#D0021B",
        disableBtn: false,
        onPress: () => {}
      };
    default:
      return {
        backgroundColor: "rgba(255,204,0,0.1)",
        icon: <InfoIcon />,
        text: "eway.pending" as "eway.pending",
        buttonText: "add.now" as "add.now",
        borderColor: "#FFCC00",
        disableBtn: false,
        onPress: (setModal: any) => setModal(true)
      };
  }
};

const Card = styled(Flex)<{ bgColor: string; borderColor: string }>`
  padding: 8px;
  background-color: ${props => props.bgColor};
  border-radius: 2px;
  border-width: 1px;
  border-color: ${props => props.borderColor};
  width: 100%;
  align-items: center;
`;

const getGenerateEWBText = () => {
  return (
    <>
      <TranslationText id={"generate.ewb"}></TranslationText>
    </>
  );
};

const EWayBillCard = ({
  status,
  ewbNumber,
  valipUpto,
  addEWayBill,
  tripId,
  navigation
}: EWayBillCardProps & EWayBillType) => {
  const { translate } = useContext(I18nContext);
  const [loading, setLoading] = useState(false);
  const [ewayStatus] = useState(ewayStatusProps(status));
  const [showModal, setModal] = useState(false);
  const [number, setNumber] = useState("");

  return (
    <>
      <Card
        bgColor={ewayStatus.backgroundColor}
        borderColor={ewayStatus.borderColor}
      >
        <FlexRow height={"30px"} alignItems={"center"} p={"0px"}>
          <FlexColumn flex={0.3}>{ewayStatus.icon}</FlexColumn>
          <FlexColumn flex={2}>
            <Text fontSize={"16px"}>
              <TranslationText id={ewayStatus.text}></TranslationText>
            </Text>
          </FlexColumn>
          {!ewayStatus.disableBtn && ewayStatus.buttonText ? (
            <StyledButton
              title={
                <TranslationText id={ewayStatus.buttonText}></TranslationText>
              }
              onPress={() => ewayStatus.onPress(setModal)}
            />
          ) : (
            <>
              {ewayStatus.buttonText ? (
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  <TranslationText id={ewayStatus.buttonText}></TranslationText>
                </Text>
              ) : null}
            </>
          )}
        </FlexRow>
        {ewbNumber && (
          <FlexRow width={"100%"} pt={"16px"}>
            <TextWrapper label={translate("ewb.number")}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                {ewbNumber}
              </Text>
            </TextWrapper>
          </FlexRow>
        )}
        <FlexRow width={"100%"}>
          {valipUpto && (
            <TextWrapper label={translate("valid.upto")}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                {valipUpto}
              </Text>
            </TextWrapper>
          )}
        </FlexRow>
      </Card>
      <Modal transparent={true} visible={showModal}>
        <Box
          bg={"rgba(0,0,0,0.2)"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box px={20} py={24} bg={"#FFFFFF"} borderRadius={4} width={"80%"}>
            <Flex width={"100%"}>
              <Box pb={"30px"}>
                <Text color={"#000066"} fontSize={"18px"} fontWeight={"bold"}>
                  <TranslationText id="eway.bill.details" />
                </Text>
                <TextWrapper label={translate("ewb.number")}>
                  <Input value={number} onChangeText={num => setNumber(num)} />
                </TextWrapper>
                <StyledButton
                  title={
                    loading ? (
                      <TranslationText id="loading" />
                    ) : (
                      <TranslationText id={"submit"}></TranslationText>
                    )
                  }
                  width={"150px"}
                  onPress={async () => {
                    setLoading(true);
                    await addEWayBill({
                      ewb_number: number,
                      tripId
                    })
                      .then(res => {
                        setLoading(false);
                        if (res.type === "ADD_EWAYBILL_SUCCESS") {
                          setModal(false);
                          navigation?.goBack();
                        } else {
                          ToastAndroid.show(
                            translate("something.went wrong.please.try.again"),
                            ToastAndroid.SHORT
                          );
                        }
                      })
                      .catch(() => {
                        setLoading(false);
                        ToastAndroid.show(
                          translate("something.went wrong.please.try.again"),
                          ToastAndroid.SHORT
                        );
                      });
                  }}
                />
              </Box>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />
              <Box pt={"30px"}>
                <Text pb={"10px"} color={"#000066"} fontSize={"16px"}>
                  {" "}
                  <TranslationText
                    id={"do.not.have.ewb"}
                  ></TranslationText>{" "}
                </Text>
                <StyledButton
                  variant="outline"
                  title={getGenerateEWBText()}
                  width={"100%"}
                  onPress={() => {
                    setModal(false);
                    navigation?.navigate("EWayBillGenerationPage", { tripId });
                  }}
                />
              </Box>
              <FlexRow
                pt={"16px"}
                width={"100%"}
                height={"30px"}
                alignItems={"center"}
              >
                <StyledButton
                  width={"100%"}
                  variant="transparent"
                  title={
                    <Text color={"#7A869A"}>
                      <TranslationText id={"close"}></TranslationText>
                    </Text>
                  }
                  onPress={() => setModal(false)}
                />
              </FlexRow>
            </Flex>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default connector(EWayBillCard);
