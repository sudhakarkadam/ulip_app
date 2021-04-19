import React, { useState, useContext, useRef } from "react";
import { Page, PageContent } from "../../../components/@styled/Page";
import { FlexColumn, Flex } from "../../../components/@styled/BaseElements";
import {
  PrimaryHeaderText,
  TextWrapper,
  ErrorText
} from "../../../components/@styled/Text";
import colors from "../../../theme/colors";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import Input from "../../../components/InputComponent";
import { i18n, TranslationText } from "../../../components/InternationalisationProvider";
import SelectComponent from "../../../components/SelectComponent";

import ActionCreators from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { ToastAndroid, ScrollView } from "react-native";
import { HomeStackParamList } from "./LSPHomeStack";
import { StackScreenProps } from "@react-navigation/stack";
import { CommonState } from "../../../reducers";
import { Formik } from "formik";
import { tomatoBorder } from "../../../utils/tomatoBorder";
import { vehicleRegex } from "../../../utils/constants";
import { I18nContext } from "../../../components/InternationalisationProvider";


const mapStateToProps = (state: CommonState) => ({
  trips: state.trips,
  user: state.user,
  appConfig: state.appConfig
});
const { saveTruck } = ActionCreators;
const mapDispatchToProps = { saveTruck };

interface FormVals {
  truckNumber: string;
  truckName: string;
  gpsVendor: string;
  gpsId: string;
  truckType: string;
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

type AddTruckProps = StackScreenProps<HomeStackParamList, "AddTruck">;

type setFieldErrorType = (field: string, message: string) => void;

type setSubmittingType = (isSubmitting: boolean) => void;

const AddTruck: React.FC<ReduxProps & AddTruckProps> = props => {
  const [loading, setLoading] = useState(false);
  const [vaahanError, setVaahanError] = useState("");
  const { translate } = useContext(i18n);
  const scrollViewRef = useRef<ScrollView>(null);
  const trucksNotInVahan = useRef<string[]>([]);
  const { appConfig, user } = props;

  const fireSaveTruck = async (
    values: FormVals,
    setFieldError: setFieldErrorType,
    setSubmitting: setSubmittingType
  ) => {
    const profileCreated = user.data.user_details.find(
      role => role.profile.persona === "LSP"
    );
    const businessCreated = profileCreated?.business_details;
    setLoading(true);
    try {
      await props.saveTruck({
        business_id: businessCreated?.business_id || "",
        vehicle_details: [
          {
            device_id: values.gpsId,
            device_type: "GPS",
            truck_name: values.truckName,
            truck_number: values.truckNumber,
            truck_type: values.truckType,
            tsp_id: values.gpsVendor
          }
        ]
      });
      setLoading(false);
      ToastAndroid.show(translate("truck.save.success"), ToastAndroid.LONG);
      props.navigation.goBack();
    } catch ({
      payload: {
        res: {
          response: { type, message }
        }
      }
    }) {
      if (type === "TRUCK_NO_NOT_VALID") {
        if(message === "vehicle.not.valid"){
          setFieldError("truckNumber", translate("vehicle.not.valid"));
          setVaahanError(translate("vehicle.not.valid"));    
          trucksNotInVahan.current.push(values.truckNumber);
          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          ToastAndroid.show(translate("vehicle.not.valid"), ToastAndroid.LONG);
        }else if(message === "vehicle.not.truck"){
          setFieldError("truckNumber", translate("vehicle.not.truck"));
          setVaahanError(translate("vehicle.not.truck"));    
          trucksNotInVahan.current.push(values.truckNumber);
          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          ToastAndroid.show(translate("vehicle.not.truck"), ToastAndroid.LONG);
        }else if(message === "vehicle.not.registered"){
          setFieldError("truckNumber", translate("vehicle.not.registered"));
          setVaahanError(translate("vehicle.not.registered"));    
          trucksNotInVahan.current.push(values.truckNumber);
          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          ToastAndroid.show(translate("vehicle.not.registered"), ToastAndroid.LONG);
        }else if(message === "vahaan.not.available"){
          setFieldError("truckNumber", translate("vahaan.not.available"));
          setVaahanError(translate("vahaan.not.available"));    
          trucksNotInVahan.current.push(values.truckNumber);
          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          ToastAndroid.show(translate("vahaan.not.available"), ToastAndroid.LONG);
        }
        else{
          setFieldError("truckNumber", message);
          setVaahanError(message);    
          trucksNotInVahan.current.push(values.truckNumber);
          scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
        
      }
      setLoading(false);
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <PageContent>
        <ScrollView ref={scrollViewRef}>
          <Formik
            initialValues={{
              truckNumber: "",
              truckName: "",
              gpsVendor: "",
              gpsId: "",
              truckType: ""
            }}
            validate={values => {
              const errors: Partial<Record<keyof typeof values, string>> = {};
              if (!values.truckNumber) {
                errors.truckNumber = translate("errors.truckNumber");
              } else if (!vehicleRegex.test(values.truckNumber)) {
                errors.truckNumber = translate("errors.truckNumberInvalid");
              } else if (
                trucksNotInVahan.current.includes(values.truckNumber)
              ) {
                errors.truckNumber = vaahanError;
              }

              if (!values.truckName) {
                errors.truckName = translate("errors.truckName");
              }

              if (!values.gpsVendor) {
                errors.gpsVendor = translate("errors.gpsVendor");
              }

              if (!values.gpsId) {
                errors.gpsId = translate("errors.gpsId");
              }

              if (!values.truckType) {
                errors.truckType = translate("errors.truckType");
              }

              return errors;
            }}
            onSubmit={(values, { setFieldError, setSubmitting }) => {
              fireSaveTruck(values, setFieldError, setSubmitting);
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
              setFieldValue
            }) => (
              <FlexColumn p={6} backgroundColor="white" height="100%">
                <Flex mb={10}>
                  <PrimaryHeaderText
                    color={`${colors.black[2]}`}
                    fontSize={4}
                    fontWeight={700}
                  >
                    {translate("truck.details")}
                  </PrimaryHeaderText>
                </Flex>
                <TextWrapper showTooltip label={translate("truck.number")}>
                  <Input
                    value={values.truckNumber}
                    onChangeText={handleChange("truckNumber")}
                    onBlur={args => {
                      handleBlur("truckNumber")(args);
                      setFieldValue("truckName", values.truckNumber);
                    }}
                    style={tomatoBorder(
                      errors.truckNumber && touched.truckNumber
                    )}
                  />
                  {errors.truckNumber && touched.truckNumber && (
                    <ErrorText>{errors.truckNumber}</ErrorText>
                  )}
                </TextWrapper>
                <TextWrapper label={translate("truck.name")}>
                  <Input
                    value={values.truckName}
                    onChangeText={handleChange("truckName")}
                    onBlur={handleBlur("truckName")}
                    style={tomatoBorder(errors.truckName && touched.truckName)}
                  />
                  {errors.truckName && touched.truckName && (
                    <ErrorText>{errors.truckName}</ErrorText>
                  )}
                </TextWrapper>
                <SelectComponent
                  label={translate("gps.vendor")}
                  getSelectedValue={val => setFieldValue("gpsVendor", val)}
                  placeholder={translate("select.gps.vendor")}
                  data={
                    appConfig.data?.gps_providers.map(provider => ({
                      label: provider,
                      value: provider
                    })) || []
                  }
                  defaultValue=""
                />
                {errors.gpsVendor && touched.gpsVendor && (
                  <ErrorText>{errors.gpsVendor}</ErrorText>
                )}
                <TextWrapper label={translate("gps.id")}>
                  <Input
                    value={values.gpsId}
                    onChangeText={handleChange("gpsId")}
                    onBlur={handleBlur("gpsId")}
                    style={tomatoBorder(errors.gpsId && touched.gpsId)}
                  />
                  {errors.gpsId && touched.gpsId && (
                    <ErrorText>{errors.gpsId}</ErrorText>
                  )}
                </TextWrapper>
                <SelectComponent
                  label={translate("truck.type")}
                  getSelectedValue={val => setFieldValue("truckType", val)}
                  placeholder={translate("select.truck")}
                  data={
                    appConfig.data?.truck_types.map(type => ({
                      label: type,
                      value: type
                    })) || []
                  }
                  defaultValue=""
                />
                {errors.truckType && touched.truckType && (
                  <ErrorText>{errors.truckType}</ErrorText>
                )}
                <Flex mt={10}>
                  <StyledButton
                    disabled={loading || isSubmitting}
                    title={translate("save.truck")}
                    fontSize={14}
                    onPress={handleSubmit}
                    loading={isSubmitting}
                  />
                </Flex>
              </FlexColumn>
            )}
          </Formik>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default connector(AddTruck);

