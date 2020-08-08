import React, { useContext, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { View, ScrollView } from "react-native";
import Input from "./InputComponent";
import { Text, Flex, Box } from "./@styled/BaseElements";
import { TextWrapper } from "./@styled/Text";
import StyledButton from "./@styled/StyledButton";
import { Page, PageContent } from "./@styled/Page";

import ActionCreators from "../actions/ActionCreators";
import { CommonState } from "../reducers";
import SelectComponent from "./SelectComponent";
import { ToastAndroid } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { TripStackList } from "../apps/LSP/components/LSPTripStack";
import { I18nContext, TranslationText } from "./InternationalisationProvider";
type OwnProps = StackScreenProps<TripStackList, "EWayBillGenerationPage">;

const transactionSubTypes = [
  "SUPPLY",
  "IMPORT",
  "EXPORT",
  "JOB_WORK",
  "FOR_OWN_USE",
  "JOB_WORK_RETURNS",
  "SALES_RETURN",
  "SKD_CKD_LOTS",
  "LINE_SALES",
  "RECIPIENT_NOT_KNOWN",
  "EXHIBITION_OR_FAIRS",
  "Others"
];

const { generateEwayBill } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  user: state.user?.data
});
const connector = connect(mapStateToProps, { generateEwayBill });
type EWayBillGenerateType = ConnectedProps<typeof connector>;

const EWayBillGenerationPage = (props: EWayBillGenerateType & OwnProps) => {
  const { translate } = useContext(I18nContext);
  const { userPersona } = props.user || {};
  const { tripId: trip_id } = props.route.params;
  const login_type = userPersona === "LSP" ? "TRANSPORTER" : "TAX_PAYER";
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_gst, setUserGst] = useState("");
  const [transaction_type, setTransactionType] = useState("");
  const [transaction_sub_type, setTransactionSubType] = useState("");
  const [supplier_gstn, setSupplierGst] = useState("");
  const [recipient_gstn, setRecipientGst] = useState("URP");
  const [delivery_pincode, setDeliveryPincode] = useState("");
  const [invoice_number, setInvoiceNum] = useState("");
  const [invoice_date, setDate] = useState("");
  const [total_value, setTotalValue] = useState("");
  const [hsn_code, setHsnCode] = useState("");
  const [vehicle_number, setVehicleNum] = useState("");
  const [from_state_code, setFromStateCode] = useState("");
  const [to_state_code, setToStateCode] = useState("");
  const [act_from_state_code, setDispatchFromState] = useState("");
  const [ship_to_state, setShipToState] = useState("");
  const [consignor_pincode, setConsignorPincode] = useState("");
  const [transporter_id, setTransporterId] = useState("");
  return (
    <Page>
      <PageContent>
        <ScrollView>
          <Flex m={20} p={"16px"} backgroundColor={"white"}>
            <Text
              fontSize={"24px"}
              fontWeight={"bold"}
              color={"#000066"}
              pb={"16px"}
            >
              <TranslationText id="details"></TranslationText>
            </Text>
            <Text pb={"12px"} fontSize={"14px"} color={"#000066"}>
              <TranslationText id="must.have.ewb"></TranslationText>
            </Text>
            <TextWrapper label={translate("eway.username")}>
              <Input
                value={username}
                onChangeText={text => setUsername(text)}
              />
            </TextWrapper>
            <TextWrapper label={translate("eway.password")}>
              <Input
                value={password}
                onChangeText={text => setPassword(text)}
                textContentType={"password"}
                secureTextEntry={true}
              />
            </TextWrapper>
            {userPersona === "LSP" && (
              <TextWrapper label="User GST Number">
                <Input
                  value={user_gst}
                  onChangeText={text => setUserGst(text)}
                />
              </TextWrapper>
            )}
            <View
              style={{
                borderBottomColor: "#EFF0F2",
                borderBottomWidth: 1
              }}
            />
            <Box p={1} />
            <View
              style={{
                borderBottomColor: "#EFF0F2",
                borderBottomWidth: 1
              }}
            />
            <Box p={3} />

            <TextWrapper label="Transaction type">
              <SelectComponent
                data={["INBOUND", "OUTBOUND"].map(type => ({
                  label: type,
                  value: type
                }))}
                defaultValue={""}
                getSelectedValue={val => setTransactionType(val)}
              />
            </TextWrapper>

            <TextWrapper label="Transaction sub-type">
              <SelectComponent
                data={transactionSubTypes.map(type => ({
                  label: type,
                  value: type
                }))}
                defaultValue={""}
                getSelectedValue={val => setTransactionSubType(val)}
              />
            </TextWrapper>

            <TextWrapper label="Supplier’s GSTIN">
              <Input
                value={supplier_gstn}
                onChangeText={text => setSupplierGst(text)}
              />
            </TextWrapper>

            <TextWrapper label="Recipient’s GSTIN">
              <Input
                value={recipient_gstn}
                onChangeText={text => setRecipientGst(text)}
              />
            </TextWrapper>

            <TextWrapper label="Delivery Pincode">
              <Input
                value={delivery_pincode}
                onChangeText={text => setDeliveryPincode(text)}
              />
            </TextWrapper>

            <TextWrapper label="Invoice number">
              <Input
                value={invoice_number}
                onChangeText={text => setInvoiceNum(text)}
              />
            </TextWrapper>

            <TextWrapper label="Invoice date">
              <Input
                value={invoice_date}
                onChangeText={text => setDate(text)}
              />
            </TextWrapper>

            <TextWrapper label="Total Value">
              <Input
                value={total_value}
                onChangeText={text => setTotalValue(text)}
              />
            </TextWrapper>

            <TextWrapper label="HSN Code">
              <Input value={hsn_code} onChangeText={text => setHsnCode(text)} />
            </TextWrapper>

            <TextWrapper label="Vehicle number">
              <Input
                value={vehicle_number}
                onChangeText={text => setVehicleNum(text)}
              />
            </TextWrapper>

            <TextWrapper label="From Billing State">
              <Input
                value={from_state_code}
                onChangeText={text => setFromStateCode(text)}
              />
            </TextWrapper>

            <TextWrapper label="To Billing State">
              <Input
                value={to_state_code}
                onChangeText={text => setToStateCode(text)}
              />
            </TextWrapper>

            <TextWrapper label="Dispatch from state">
              <Input
                value={act_from_state_code}
                onChangeText={text => setDispatchFromState(text)}
              />
            </TextWrapper>

            <TextWrapper label="Ship To State">
              <Input
                value={ship_to_state}
                onChangeText={text => setShipToState(text)}
              />
            </TextWrapper>

            <TextWrapper label="Bill From Pincode">
              <Input
                value={consignor_pincode}
                onChangeText={text => setConsignorPincode(text)}
              />
            </TextWrapper>

            <TextWrapper label="Transporter Id">
              <Input
                value={transporter_id}
                onChangeText={text => setTransporterId(text)}
              />
            </TextWrapper>

            <StyledButton
              width={"100%"}
              title={
                <Text>
                  {!loading ? (
                    <>
                      <TranslationText id="continue" />{" "}
                      <Text fontSize={5}>&#8594;</Text>
                    </>
                  ) : (
                    <TranslationText id="loading" />
                  )}
                </Text>
              }
              onPress={async () => {
                setLoading(true);
                await props
                  .generateEwayBill({
                    trip_id,
                    username,
                    password,
                    user_gst,
                    login_type,
                    transaction_type,
                    transaction_sub_type,
                    supplier_gstn,
                    recipient_gstn,
                    delivery_pincode,
                    invoice_number,
                    invoice_date,
                    total_value,
                    hsn_code,
                    vehicle_number,
                    from_state_code,
                    to_state_code,
                    act_from_state_code,
                    ship_to_state,
                    consignor_pincode,
                    transporter_id
                  })
                  .then(res => {
                    setLoading(false);
                    if (res.type === "GENERATE_EWAYBILL_SUCCESS") {
                      props.navigation?.goBack();
                    } else {
                      ToastAndroid.show(
                        "Something went wrong. Please try again.",
                        ToastAndroid.SHORT
                      );
                    }
                  })
                  .catch(() => {
                    setLoading(false);
                    ToastAndroid.show(
                      "Something went wrong. Please try again.",
                      ToastAndroid.SHORT
                    );
                  });
              }}
            />
          </Flex>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default connector(EWayBillGenerationPage);
