/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/prefer-interface */
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import ShipperPersonProfile from "./ShipperPersonProfile";
import ShipperCompanyProfile from "./ShipperCompanyProfile";
import ShipperCreateProfile from "./ShipperCreateProfile";
import ShipperTripDetails from "./ShipperTripDetails";
import MainTripListing from "./MainTripListing";
import ShipperCreateTrip from "./ShipperCreateTrip";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import EWayBillGenerationPage from "../../../components/EWayBillGenerationPage";
import { PerosnaDetails } from "../../../models/CommonModel";
import WarehoueseAdd from "./WarehouseAdd";
import ShipperMetrics from "./ShipperMetrics";
import { I18nContext } from "../../../components/InternationalisationProvider";

export type HomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  CreateTrip: undefined;
  MainTripListing: undefined;
  ShipperTripDetails: { data: string };
  WarehouseAdd: undefined;
  ShipperMetrics: undefined;
  EWayBillGenerationPage: {
    tripId?: number;
  };
};

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});

const connector = connect(mapStateToProps, {} as any);
const Stack = createStackNavigator<HomeStackParamList>();

type OwnProps = ConnectedProps<typeof connector>;

const HomeStack = (props: OwnProps) => {
  const profileCreated = props.userInfo.user_details.find(
    (role: PerosnaDetails) => role.profile.persona === "SHIPPER"
  );
  const personVerified = profileCreated?.profile.name;
  const comapnyVerified = profileCreated?.business_details;
  const { translate } = useContext(I18nContext);
  return (
    <>
      {!personVerified || !comapnyVerified ? (
        <Stack.Navigator
          initialRouteName="CreateProfile"
          screenOptions={HeaderOptions}
        >
          <Stack.Screen
            name="CreateProfile"
            component={ShipperCreateProfile}
            options={{ title: translate("home") }}
          />
          <Stack.Screen
            name="PersonProfile"
            component={ShipperPersonProfile}
            options={{ title: translate("create.profile") }}
          />
          <Stack.Screen
            name="CompanyProfile"
            component={ShipperCompanyProfile}
            options={{ title: translate("add.company") }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="ShipperMetrics"
          screenOptions={HeaderOptions}
        >
          <Stack.Screen
            name="ShipperMetrics"
            component={ShipperMetrics}
            options={{ title: translate("home") }}
          />
          <Stack.Screen
            name="MainTripListing"
            component={MainTripListing}
            options={{ title: translate("home") }}
          />
          <Stack.Screen
            name="ShipperTripDetails"
            component={ShipperTripDetails}
            options={{ title: translate("trip.details") }}
          />
          <Stack.Screen
            name="CreateTrip"
            component={ShipperCreateTrip}
            options={{ title: translate("create.trip") }}
          />
          <Stack.Screen
            name="WarehouseAdd"
            component={WarehoueseAdd}
            options={{ title: translate("add.warehouse") }}
          />
          <Stack.Screen
            name="EWayBillGenerationPage"
            component={EWayBillGenerationPage}
            options={{ title: translate("generate.ewb") }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default connector(HomeStack);
