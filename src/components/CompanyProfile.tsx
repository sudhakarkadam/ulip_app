import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import Input from "../components/InputComponent";
import StyledButton from "../components/@styled/StyledButton";
import colors from "../theme/colors";
import { Flex1 } from "../components/@styled/Flex";
import {
  FlexColumn,
  Flex,
  TouchableOpacity,
  Box
} from "./@styled/BaseElements";
import { PrimaryHeaderText, TextWrapper, ErrorText } from "./@styled/Text";
import { Page, PageContent } from "./@styled/Page";
import { useIsFocused } from "@react-navigation/native";
import { I18nContext, TranslationText } from "./InternationalisationProvider";
import { Formik } from "formik";
import { tomatoBorder } from "../utils/tomatoBorder";
const MapmyIndia = require("mmi-widget");

interface OwnProps {
  createCompanyCallback: (companyData: {
    name: string;
    regNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    lat: number;
    lng: number;
  }) => void;
}

const PlacePicker = MapmyIndia.default.MapmyIndiaPlacePicker;

const CompanyProfile = (props: OwnProps) => {
  const { translate } = useContext(I18nContext);
  const [showPicker, setPickerVisibility] = useState(false);
  const isFocused = useIsFocused();
  return (
    <Flex1>
      <Formik
        initialValues={{
          name: "",
          regNumber: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          lat: 0,
          lng: 0,
          isLocationSet: false
        }}
        validate={values => {
          const errors: Partial<Record<keyof typeof values, string>> = {};
          if (!values.name) {
            errors.name = translate("errors.name");
          }

          if (!values.regNumber) {
            errors.regNumber = translate("errors.regNumber");
          }

          if (values.regNumber && values.regNumber.length > 20) {
            errors.regNumber = translate("errors.regNumber.maxlength");
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

          if (!values.postalCode) {
            errors.postalCode = translate("errors.pinCode");
          }
          return errors;
        }}
        onSubmit={async values => {
          props.createCompanyCallback({
            name: values.name,
            regNumber: values.regNumber,
            address: values.address,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            lat: values.lat,
            lng: values.lng
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
          touched,
          setFieldTouched,
          setValues
        }) => {
          const locationProps = values.lat
            ? { center: [values.lat, values.lng] }
            : {};
          return (
            <>
              <Page>
                <PageContent>
                  <ScrollView>
                    <FlexColumn p={6} backgroundColor="white" height="100%">
                      <Flex mb={7}>
                        <PrimaryHeaderText
                          color={`${colors.black[2]}`}
                          fontSize={4}
                          fontWeight={700}
                        >
                          <TranslationText id="company.details"></TranslationText>
                        </PrimaryHeaderText>
                      </Flex>
                      <TextWrapper label={translate("company.name")}>
                        <Input
                          value={values.name}
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          style={tomatoBorder(errors.name && touched.name)}
                        />
                      </TextWrapper>
                      {errors.name && touched.name && (
                        <ErrorText>{errors.name}</ErrorText>
                      )}
                      <TextWrapper label={translate("registration.number")}>
                        <Input
                          value={values.regNumber}
                          onChangeText={handleChange("regNumber")}
                          onBlur={handleBlur("regNumber")}
                          style={tomatoBorder(
                            errors.regNumber && touched.regNumber
                          )}
                        />
                      </TextWrapper>
                      {errors.regNumber && touched.regNumber && (
                        <ErrorText>{errors.regNumber}</ErrorText>
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
                              {isFocused && (
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

                      <TextWrapper label={translate("address")}>
                        <Input
                          value={values.address}
                          onChangeText={handleChange("address")}
                          onBlur={handleBlur("address")}
                          numberOfLines={3}
                          style={tomatoBorder(
                            errors.address && touched.address
                          )}
                          multiline={true}
                        />
                      </TextWrapper>

                      {errors.address && touched.address && (
                        <ErrorText>{errors.address}</ErrorText>
                      )}
                      <TextWrapper label={translate("city")}>
                        <Input
                          value={values.city}
                          onChangeText={handleChange("city")}
                          onBlur={handleBlur("city")}
                          style={tomatoBorder(errors.city && touched.city)}
                        />
                      </TextWrapper>

                      {errors.city && touched.city && (
                        <ErrorText>{errors.city}</ErrorText>
                      )}
                      <TextWrapper label={translate("state")}>
                        <Input
                          value={values.state}
                          onChangeText={handleChange("state")}
                          onBlur={handleBlur("state")}
                          style={tomatoBorder(errors.state && touched.state)}
                        />
                      </TextWrapper>

                      {errors.state && touched.state && (
                        <ErrorText>{errors.state}</ErrorText>
                      )}
                      <TextWrapper label={translate("pincode")}>
                        <Input
                          value={values.postalCode}
                          onChangeText={handleChange("postalCode")}
                          onBlur={handleBlur("postalCode")}
                          style={tomatoBorder(
                            errors.postalCode && touched.postalCode
                          )}
                        />
                      </TextWrapper>

                      {errors.postalCode && touched.postalCode && (
                        <ErrorText>{errors.postalCode}</ErrorText>
                      )}

                      <Flex mt={10}>
                        <StyledButton
                          disabled={isSubmitting}
                          title={translate("save.company")}
                          fontSize={14}
                          onPress={handleSubmit}
                        />
                      </Flex>
                    </FlexColumn>
                  </ScrollView>
                </PageContent>
              </Page>
              {showPicker && (
                <Flex1
                  position="absolute"
                  top="0"
                  bottom="0"
                  right="0"
                  left="0"
                >
                  <PlacePicker
                    resultCallback={(result: any) => {
                      setValues({
                        address: result.formatted_address,
                        city: result.city,
                        postalCode: result.pincode,
                        state: result.state,
                        isLocationSet: true,
                        lat: result.lat,
                        lng: result.lng,
                        name: values.name,
                        regNumber: values.regNumber
                      });
                      setPickerVisibility(false);
                    }}
                  />
                </Flex1>
              )}
            </>
          );
        }}
      </Formik>
    </Flex1>
  );
};

export default CompanyProfile;
