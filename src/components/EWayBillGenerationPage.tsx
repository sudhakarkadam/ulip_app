import React, { useContext } from "react";
import { ConnectedProps, connect } from "react-redux";
import { View, ScrollView } from "react-native";
import Input from "./InputComponent";
import { Text, Flex, Box } from "./@styled/BaseElements";
import { TextWrapper } from "./@styled/Text";
import StyledButton from "./@styled/StyledButton";
import { Page, PageContent } from "./@styled/Page";
import { Formik } from "formik";
import ActionCreators from "../actions/ActionCreators";
import { CommonState } from "../reducers";
import SelectComponent from "./SelectComponent";
import { ToastAndroid } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { TripStackList } from "../apps/LSP/components/LSPTripStack";
import { I18nContext, TranslationText } from "./InternationalisationProvider";
import { tomatoBorder } from "../utils/tomatoBorder";

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
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        user_gst: "",
        transaction_type: "",
        transaction_sub_type: "",
        supplier_gstn: "",
        recipient_gstn: "URP",
        delivery_pincode: "",
        invoice_number: "",
        invoice_date: "",
        total_value: "",
        hsn_code: "",
        vehicle_number: "",
        from_state_code: "",
        to_state_code: "",
        act_from_state_code: "",
        ship_to_state: "",
        consignor_pincode: "",
        transporter_id: ""
      }}
      validate={values => {
        const errors: Partial<Record<keyof typeof values, string>> = {};
        if (!values.username) {
          errors.username = translate("errors.ewb.username");
        }

        if (!values.password) {
          errors.password = translate("errors.ewb.password");
        }

        if (!values.transaction_type) {
          errors.transaction_type = translate("errors.ewb.transactionType");
        }

        if (!values.transaction_sub_type) {
          errors.transaction_sub_type = translate(
            "errors.ewb.transaction_sub_type"
          );
        }

        if (!values.supplier_gstn) {
          errors.supplier_gstn = translate("errors.ewb.supplier_gstn");
        }

        if (!values.recipient_gstn) {
          errors.recipient_gstn = translate("errors.ewb.recipient_gstn");
        }

        if (!values.delivery_pincode) {
          errors.delivery_pincode = translate("errors.ewb.delivery_pincode");
        }

        if (!values.invoice_number) {
          errors.invoice_number = translate("errors.ewb.invoice_number");
        }

        if (!values.invoice_date) {
          errors.invoice_date = translate("errors.ewb.invoice_date");
        }

        if (!values.total_value) {
          errors.total_value = translate("errors.ewb.total_value");
        }

        if (!values.hsn_code) {
          errors.hsn_code = translate("errors.ewb.hsn_code");
        }

        if (!values.vehicle_number) {
          errors.vehicle_number = translate("errors.ewb.vehicle_number");
        }

        if (!values.from_state_code) {
          errors.from_state_code = translate("errors.ewb.from_state_code");
        }

        if (!values.to_state_code) {
          errors.to_state_code = translate("errors.ewb.to_state_code");
        }

        if (!values.act_from_state_code) {
          errors.act_from_state_code = translate(
            "errors.ewb.act_from_state_code"
          );
        }

        if (!values.ship_to_state) {
          errors.ship_to_state = translate("errors.ewb.ship_to_state");
        }

        if (!values.consignor_pincode) {
          errors.consignor_pincode = translate("errors.ewb.consignor_pincode");
        }

        if (!values.transporter_id) {
          errors.transporter_id = translate("errors.ewb.transporter_id");
        }

        return errors;
      }}
      onSubmit={async values => {
        await props
          .generateEwayBill({
            trip_id,
            username: values.username,
            password: values.password,
            user_gst: values.user_gst || values.supplier_gstn,
            login_type: login_type,
            transaction_type: values.transaction_type,
            transaction_sub_type: values.transaction_sub_type,
            supplier_gstn: values.supplier_gstn,
            recipient_gstn: values.recipient_gstn,
            delivery_pincode: values.delivery_pincode,
            invoice_number: values.invoice_number,
            invoice_date: values.invoice_date,
            total_value: values.total_value,
            hsn_code: values.hsn_code,
            vehicle_number: values.vehicle_number,
            from_state_code: values.from_state_code,
            to_state_code: values.to_state_code,
            act_from_state_code: values.act_from_state_code,
            ship_to_state: values.ship_to_state,
            consignor_pincode: values.consignor_pincode,
            transporter_id: values.transporter_id
          })
          .then(res => {
            if (res.type === "GENERATE_EWAYBILL_SUCCESS") {
              props.navigation?.goBack();
            } else {
              ToastAndroid.show(
                translate("something.went wrong.please.try.again"),
                ToastAndroid.SHORT
              );
            }
          })
          .catch(() => {
            ToastAndroid.show(
              translate("something.went wrong.please.try.again"),
              ToastAndroid.SHORT
            );
          });
      }}
    >
      {({
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched
      }) => {
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
                      value={values.username}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      style={tomatoBorder(errors.username && touched.username)}
                    />
                  </TextWrapper>
                  <TextWrapper label={translate("eway.password")}>
                    <Input
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      style={tomatoBorder(errors.password && touched.password)}
                      textContentType={"password"}
                      secureTextEntry={true}
                    />
                  </TextWrapper>
                  {userPersona === "LSP" && (
                    <TextWrapper label={translate("eway.user.gst")}>
                      <Input
                        value={values.user_gst}
                        onChangeText={handleChange("user_gst")}
                        onBlur={handleBlur("user_gst")}
                        style={tomatoBorder(
                          errors.user_gst && touched.user_gst
                        )}
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

                  <TextWrapper label={translate("eway.transaction")}>
                    <SelectComponent
                      data={["INBOUND", "OUTBOUND"].map(type => ({
                        label: type,
                        value: type
                      }))}
                      placeholder={translate("select.item")}
                      defaultValue={""}
                      getSelectedValue={handleChange("transaction_type")}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.transaction.subtype")}>
                    <SelectComponent
                      data={transactionSubTypes.map(type => ({
                        label: type,
                        value: type
                      }))}
                      placeholder={translate("select.item")}
                      defaultValue={""}
                      getSelectedValue={handleChange("transaction_sub_type")}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.supplier.gstin")}>
                    <Input
                      value={values.supplier_gstn}
                      onChangeText={handleChange("supplier_gstn")}
                      onBlur={handleBlur("supplier_gstn")}
                      style={tomatoBorder(
                        errors.supplier_gstn && touched.supplier_gstn
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.receipt.gstin")}>
                    <Input
                      value={values.recipient_gstn}
                      onChangeText={handleChange("recipient_gstn")}
                      onBlur={handleBlur("recipient_gstn")}
                      style={tomatoBorder(
                        errors.recipient_gstn && touched.recipient_gstn
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.delivery.pincode")}>
                    <Input
                      value={values.delivery_pincode}
                      onChangeText={handleChange("delivery_pincode")}
                      onBlur={handleBlur("delivery_pincode")}
                      style={tomatoBorder(
                        errors.delivery_pincode && touched.delivery_pincode
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.invoice.number")}>
                    <Input
                      value={values.invoice_number}
                      onChangeText={handleChange("invoice_number")}
                      onBlur={handleBlur("invoice_number")}
                      style={tomatoBorder(
                        errors.invoice_number && touched.invoice_number
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.invoice.date")}>
                    <Input
                      value={values.invoice_date}
                      onChangeText={handleChange("invoice_date")}
                      onBlur={handleBlur("invoice_date")}
                      style={tomatoBorder(
                        errors.invoice_date && touched.invoice_date
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.total.value")}>
                    <Input
                      value={values.total_value}
                      onChangeText={handleChange("total_value")}
                      onBlur={handleBlur("total_value")}
                      style={tomatoBorder(
                        errors.total_value && touched.total_value
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.hsn.code")}>
                    <Input
                      value={values.hsn_code}
                      onChangeText={handleChange("hsn_code")}
                      onBlur={handleBlur("hsn_code")}
                      style={tomatoBorder(errors.hsn_code && touched.hsn_code)}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.vehicle.number")}>
                    <Input
                      value={values.vehicle_number}
                      onChangeText={handleChange("vehicle_number")}
                      onBlur={handleBlur("vehicle_number")}
                      style={tomatoBorder(
                        errors.vehicle_number && touched.vehicle_number
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.from.billing.state")}>
                    <Input
                      value={values.from_state_code}
                      onChangeText={handleChange("from_state_code")}
                      onBlur={handleBlur("from_state_code")}
                      style={tomatoBorder(
                        errors.from_state_code && touched.from_state_code
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.to.billing.state")}>
                    <Input
                      value={values.to_state_code}
                      onChangeText={handleChange("to_state_code")}
                      onBlur={handleBlur("to_state_code")}
                      style={tomatoBorder(
                        errors.to_state_code && touched.to_state_code
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.dispatch.from.state")}>
                    <Input
                      value={values.act_from_state_code}
                      onChangeText={handleChange("act_from_state_code")}
                      onBlur={handleBlur("act_from_state_code")}
                      style={tomatoBorder(
                        errors.act_from_state_code &&
                          touched.act_from_state_code
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.ship.to.state")}>
                    <Input
                      value={values.ship_to_state}
                      onChangeText={handleChange("ship_to_state")}
                      onBlur={handleBlur("ship_to_state")}
                      style={tomatoBorder(
                        errors.ship_to_state && touched.ship_to_state
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.bill.from.pincode")}>
                    <Input
                      value={values.consignor_pincode}
                      onChangeText={handleChange("consignor_pincode")}
                      onBlur={handleBlur("consignor_pincode")}
                      style={tomatoBorder(
                        errors.consignor_pincode && touched.consignor_pincode
                      )}
                    />
                  </TextWrapper>

                  <TextWrapper label={translate("eway.transporter.id")}>
                    <Input
                      value={values.transporter_id}
                      onChangeText={handleChange("transporter_id")}
                      onBlur={handleBlur("transporter_id")}
                      style={tomatoBorder(
                        errors.transporter_id && touched.transporter_id
                      )}
                    />
                  </TextWrapper>

                  <StyledButton
                    disabled={isSubmitting}
                    width={"100%"}
                    title={
                      <Text>
                        {!isSubmitting ? (
                          <>
                            <TranslationText id="continue" />{" "}
                            <Text fontSize={5}>&#8594;</Text>
                          </>
                        ) : (
                          <TranslationText id="loading" />
                        )}
                      </Text>
                    }
                    onPress={handleSubmit}
                  />
                </Flex>
              </ScrollView>
            </PageContent>
          </Page>
        );
      }}
    </Formik>
  );
};

export default connector(EWayBillGenerationPage);
