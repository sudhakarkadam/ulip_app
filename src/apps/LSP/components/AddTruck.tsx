import React, { useState, useContext } from "react";
import { Page, PageContent } from "../../../components/@styled/Page";
import { ScrollView } from "react-native-gesture-handler";
import { FlexColumn, Flex } from "../../../components/@styled/BaseElements";
import {
  PrimaryHeaderText,
  TextWrapper
} from "../../../components/@styled/Text";
import colors from "../../../theme/colors";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import Input from "../../../components/InputComponent";
import { i18n } from "../../../components/InternationalisationProvider";
import SelectComponent from "../../../components/SelectComponent";
import { ReducerState } from "../store";
import ActionCreators from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { ToastAndroid } from "react-native";
import { HomeStackParamList } from "./LSPHomeStack";
import { StackScreenProps } from "@react-navigation/stack";

const mapStateToProps = (state: ReducerState) => ({
  trips: state.trips,
  user: state.user,
  appConfig: state.appConfig
});
const { saveTruck } = ActionCreators;
const mapDispatchToProps = { saveTruck };

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

type AddTruckProps = StackScreenProps<HomeStackParamList, "AddTruck">;

const AddTruck: React.FC<ReduxProps & AddTruckProps> = props => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [gpsId, setGpsId] = useState("");
  const [type, setType] = useState("");
  const { translate } = useContext(i18n);
  const { appConfig, user } = props;

  const fireSaveTruck = async () => {
    const profileCreated = user.data.user_details.find(
      role => role.profile.persona === "LSP"
    );
    const businessCreated = profileCreated?.business_details;
    try {
      await saveTruck({
        business_id: businessCreated?.business_id || "",
        vehicle_details: [
          {
            device_id: gpsId,
            device_type: "GPS",
            truck_name: name,
            truck_number: number,
            truck_type: type,
            tsp_id: vendor
          }
        ]
      });
      ToastAndroid.show(translate("truck.save.success"), ToastAndroid.LONG);
      props.navigation.goBack();
    } catch {
      ToastAndroid.show(translate("truck.save.error"), ToastAndroid.LONG);
    }
  };
  return (
    <Page>
      <PageContent>
        <ScrollView>
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
            <TextWrapper label={translate("truck.name")}>
              <Input value={name} onChangeText={text => setName(text)} />
            </TextWrapper>
            <TextWrapper label={translate("truck.number")}>
              <Input value={number} onChangeText={text => setNumber(text)} />
            </TextWrapper>
            <SelectComponent
              label={translate("gps.vendor")}
              getSelectedValue={val => setVendor(val)}
              data={
                appConfig.data?.gps_providers.map(provider => ({
                  label: provider,
                  value: provider
                })) || []
              }
              defaultValue=""
            />
            <TextWrapper label={translate("gps.id")}>
              <Input value={gpsId} onChangeText={text => setGpsId(text)} />
            </TextWrapper>
            <SelectComponent
              label={translate("truck.type")}
              getSelectedValue={val => setType(val)}
              data={
                appConfig.data?.truck_types.map(type => ({
                  label: type,
                  value: type
                })) || []
              }
              defaultValue=""
            />
            <Flex mt={10}>
              <StyledButton
                disabled={!number || !vendor || !gpsId || !type}
                title={translate("save.truck")}
                fontSize={14}
                onPress={fireSaveTruck}
              />
            </Flex>
          </FlexColumn>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default connector(AddTruck);
