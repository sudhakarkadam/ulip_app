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
          pinCode: ""
        }}
        validate={values => {
          const errors: Partial<typeof values> = {};
          if (!values.warehouseName) {
            errors.warehouseName = translate("errors.warehouseName");
          }

          if (!values.gstin) {
            errors.gstin = translate("errors.gstin");
          }

          if (values.gstin && !gstinPattern.test(values.gstin)) {
            errors.gstin = translate("errors.gstin.invalid");
          }

          if (!values.pinCode) {
            errors.pinCode = translate("errors.pinCode");
          }
          return errors;
        }}
        onSubmit={() => {}}
      >
        {({ errors, isSubmitting, handleBlur, handleChange, values }) => (
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
                      style={tomatoBorder(errors.warehouseName)}
                      label={translate("warehouse.name")}
                    />
                    {errors.warehouseName && (
                      <ErrorText>{errors.warehouseName}</ErrorText>
                    )}
                    <Input
                      value={values.gstin}
                      onBlur={handleBlur("gstin")}
                      onChangeText={handleChange("gstin")}
                      style={tomatoBorder(errors.gstin)}
                      label={translate("gstin.label")}
                    />
                    {errors.gstin && <ErrorText>{errors.gstin}</ErrorText>}
                    <Box mb={5}>
                      <TextWrapper label={translate("locate.on.map")}>
                        <Box height={100}>
                          <Flex1 pointerEvents="none">
                            {!showPicker && (
                              <PlacePicker
                                showJustMap={true}
                                {...locationProps}
                              />
                            )}
                          </Flex1>
                          <TouchableOpacity
                            onPress={() => setPickerVisibility(true)}
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

                    <Input
                      value={values.address}
                      onBlur={handleBlur("address")}
                      onChangeText={handleChange("address")}
                      label={translate("address")}
                      numberOfLines={3}
                      style={tomatoBorder(errors.address)}
                      multiline={true}
                    />
                    {errors.address && <ErrorText>{errors.address}</ErrorText>}
                    <Input
                      value={values.city}
                      onBlur={handleBlur("city")}
                      onChangeText={handleChange("city")}
                      style={tomatoBorder(errors.city)}
                      label={translate("city")}
                    />
                    {errors.city && <ErrorText>{errors.city}</ErrorText>}
                    <Input
                      value={values.state}
                      onBlur={handleBlur("state")}
                      onChangeText={handleChange("state")}
                      style={tomatoBorder(errors.state)}
                      label={translate("state")}
                    />
                    {errors.state && <ErrorText>{errors.state}</ErrorText>}
                    <Input
                      value={values.pinCode}
                      onBlur={handleBlur("pinCode")}
                      onChangeText={handleChange("pinCode")}
                      style={tomatoBorder(errors.pinCode)}
                      label={translate("pincode")}
                    />
                    {errors.pinCode && <ErrorText>{errors.pinCode}</ErrorText>}
                    <Flex mt={10}>
                      <StyledButton
                        disabled={
                          !values.warehouseName ||
                          !gstinPattern.test(values.gstin) ||
                          !values.pinCode ||
                          loading ||
                          isSubmitting
                        }
                        title={
                          loading ? (
                            <TranslationText id="saving"></TranslationText>
                          ) : (
                            <TranslationText id="save.warehouse"></TranslationText>
                          )
                        }
                        fontSize={14}
                        loading={isSubmitting}
                        onPress={async () => {
                          setLoading(true);
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
                            ToastAndroid.show(
                              translate("saved.warehouse"),
                              ToastAndroid.SHORT
                            );
                            navigation.goBack();
                          } catch {
                            ToastAndroid.show(
                              translate("save.warehouse.failed"),
                              ToastAndroid.SHORT
                            );
                          } finally {
                            setLoading(false);
                          }
                        }}
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
                    values.address = result.formatted_address;
                    values.city = result.city;
                    values.pinCode = result.pincode;
                    values.state = result.state;
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
