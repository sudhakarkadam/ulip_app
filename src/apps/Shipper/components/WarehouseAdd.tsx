import React, { useState, useContext } from "react";
import { PrimaryHeaderText, ErrorText } from "../../../components/@styled/Text";
import { PageContent, Page } from "../../../components/@styled/Page";
import { TranslationText } from "../../../components/InternationalisationProvider";
import {
  Box,
  Flex,
  ScrollView,
  TouchableOpacity
} from "../../../components/@styled/BaseElements";
import { TextWrapper } from "../../../components/@styled/Text";
import Input from "../../../components/InputComponent";
import { Flex1 } from "../../../components/@styled/Flex";
import StyledButton from "../../../components/@styled/StyledButton";
import { StackScreenProps } from "@react-navigation/stack";
import Actions from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import { ToastAndroid } from "react-native";
import { HomeStackParamList } from "./HomeStack";
import { Formik } from "formik";
import { tomatoBorder } from "../../../utils/tomatoBorder";
import { I18nContext } from "../../../components/InternationalisationProvider";
import { pincodeRegex } from "../../../utils/constants";

const gstinPattern = new RegExp(
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9][A-Z][0-9]$/
);

const MapmyIndia = require("mmi-widget");

const { saveWarehouse } = Actions;

const connector = connect(
  (state: CommonState) => ({
    business: state.user.data.user_details.filter(
      d => d.profile.persona === "SHIPPER"
    )[0]
  }),
  { saveWarehouse }
);

const PlacePicker = MapmyIndia.default.MapmyIndiaPlacePicker;

const WarehouseAdd: React.FC<ConnectedProps<typeof connector> &
  StackScreenProps<HomeStackParamList, "WarehouseAdd">> = ({
  saveWarehouse,
  business,
  navigation
}) => {
  const { translate } = useContext(I18nContext);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showPicker, setPickerVisibility] = useState(false);
  const id = business && business.business_details?.business_id;
  const locationProps = lat ? { center: [lng, lat] } : {};
  if (!id)
    return (
      <PrimaryHeaderText p={6}>
        <TranslationText id="no.business.id"></TranslationText>
      </PrimaryHeaderText>
    );
  return (
    <Flex1>
      <Formik
        initialValues={{
          warehouseName: "",
          gstin: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          isLocationSet: false
        }}
        validate={values => {
          const errors: Partial<Record<keyof typeof values, string>> = {};
          if (!values.warehouseName) {
            errors.warehouseName = translate("errors.warehouseName");
          }

          if (!values.gstin) {
            errors.gstin = translate("errors.gstin");
          }

          if (values.gstin && !gstinPattern.test(values.gstin)) {
            errors.gstin = translate("errors.gstin.invalid");
          }

          if (!values.isLocationSet) {
            errors.isLocationSet = translate("errors.location");
          }

          if (!values.address) {
            errors.address = translate("errors.address");
          }

          if (!values.city) {
            errors.city = translate("errors.city");
          }

          if (!values.state) {
            errors.state = translate("errors.state");
          }

          if (!values.pinCode) {
            errors.pinCode = translate("errors.pinCode");
          }

          if (!pincodeRegex.test(values.pinCode)) {
            errors.pinCode = translate("errors.pinCodeInvalid");
          }
          return errors;
        }}
        onSubmit={async values => {
          try {
            await saveWarehouse({
              business_id: id,
              gstin: values.gstin,
              warehouse_name: values.warehouseName,
              location: {
                address: values.address,
                city: values.city,
                country: "India",
                map_ref: {},
                latitude: lat,
                longitude: lng,
                name: values.warehouseName,
                postal_code: parseInt(values.pinCode, 10),
                state: values.state
              }
            });
            ToastAndroid.show(translate("saved.warehouse"), ToastAndroid.SHORT);
            navigation.goBack();
          } catch ({
            payload: {
              res: {
                response: { type, message }
              }
            }
          }) {
            if (
              type === "GSTIN_NUMBER_ALREADY_EXISTS" ||
              type === "PIN_CODE_INVALID"
            ) {
              ToastAndroid.show(message, ToastAndroid.LONG);
            } else {
              ToastAndroid.show(
                translate("save.warehouse.failed"),
                ToastAndroid.SHORT
              );
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {({
          errors,
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          setFieldTouched,
          setValues
        }) => (
          <>
            <Page>
              <PageContent>
                <ScrollView>
                  <PrimaryHeaderText p={6}>
                    <TranslationText id="warehouse.details"></TranslationText>
                  </PrimaryHeaderText>
                  <Box p={6}>
                    <Input
                      value={values.warehouseName}
                      onChangeText={handleChange("warehouseName")}
                      onBlur={handleBlur("warehouseName")}
                      style={tomatoBorder(
                        errors.warehouseName && touched.warehouseName
                      )}
                      label={translate("warehouse.name")}
                    />
                    {errors.warehouseName && touched.warehouseName && (
                      <ErrorText>{errors.warehouseName}</ErrorText>
                    )}
                    <Input
                      value={values.gstin}
                      onChangeText={handleChange("gstin")}
                      onBlur={handleBlur("gstin")}
                      style={tomatoBorder(errors.gstin && touched.gstin)}
                      label={translate("gstin.label")}
                    />
                    {errors.gstin && touched.gstin && (
                      <ErrorText>{errors.gstin}</ErrorText>
                    )}
                    <Box mb={5}>
                      <TextWrapper label={translate("locate.on.map")}>
                        <Box
                          height={100}
                          style={{
                            borderWidth: 1,
                            borderColor: "transparent",
                            borderStyle: "solid",
                            ...tomatoBorder(
                              errors.isLocationSet && touched.isLocationSet
                            )
                          }}
                        >
                          <Flex1 pointerEvents="none">
                            {!showPicker && (
                              <PlacePicker
                                showJustMap={true}
                                {...locationProps}
                              />
                            )}
                          </Flex1>
                          <TouchableOpacity
                            onPress={() => {
                              setFieldTouched("isLocationSet", true);
                              setPickerVisibility(true);
                            }}
                            style={{
                              position: "absolute",
                              top: 0,
                              bottom: 0,
                              right: 0,
                              left: 0,
                              backgroundColor: "transparent"
                            }}
                          ></TouchableOpacity>
                        </Box>
                      </TextWrapper>
                    </Box>
                    {errors.isLocationSet && touched.isLocationSet && (
                      <ErrorText>{errors.isLocationSet}</ErrorText>
                    )}

                    <Input
                      value={values.address}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      label={translate("address")}
                      numberOfLines={3}
                      style={tomatoBorder(errors.address && touched.address)}
                      multiline={true}
                    />
                    {errors.address && touched.address && (
                      <ErrorText>{errors.address}</ErrorText>
                    )}
                    <Input
                      value={values.city}
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      style={tomatoBorder(errors.city && touched.city)}
                      label={translate("city")}
                    />
                    {errors.city && touched.city && (
                      <ErrorText>{errors.city}</ErrorText>
                    )}
                    <Input
                      value={values.state}
                      onChangeText={handleChange("state")}
                      onBlur={handleBlur("state")}
                      style={tomatoBorder(errors.state && touched.state)}
                      label={translate("state")}
                    />
                    {errors.state && touched.state && (
                      <ErrorText>{errors.state}</ErrorText>
                    )}
                    <Input
                      value={values.pinCode}
                      onChangeText={handleChange("pinCode")}
                      onBlur={handleBlur("pinCode")}
                      style={tomatoBorder(errors.pinCode && touched.pinCode)}
                      label={translate("pincode")}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                    {errors.pinCode && touched.pinCode && (
                      <ErrorText>{errors.pinCode}</ErrorText>
                    )}
                    <Flex mt={10}>
                      <StyledButton
                        disabled={loading || isSubmitting}
                        title={
                          loading ? (
                            <TranslationText id="saving"></TranslationText>
                          ) : (
                            <TranslationText id="save.warehouse"></TranslationText>
                          )
                        }
                        fontSize={14}
                        loading={isSubmitting}
                        onPress={handleSubmit}
                      />
                    </Flex>
                  </Box>
                </ScrollView>
              </PageContent>
            </Page>
            {showPicker && (
              <Flex1 position="absolute" top="0" bottom="0" right="0" left="0">
                <PlacePicker
                  {...locationProps}
                  resultCallback={(result: any) => {
                    setValues({
                      address: result.formatted_address,
                      city: result.city,
                      pinCode: result.pincode,
                      state: result.state,
                      isLocationSet: true,
                      warehouseName: values.warehouseName,
                      gstin: values.gstin
                    });
                    setLat(result.lat);
                    setLng(result.lng);
                    setPickerVisibility(false);
                  }}
                />
              </Flex1>
            )}
          </>
        )}
      </Formik>
    </Flex1>
  );
};

export default connector(WarehouseAdd);
