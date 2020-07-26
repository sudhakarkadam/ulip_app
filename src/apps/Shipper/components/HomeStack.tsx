/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/prefer-interface */
import React from "react";
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
import { PerosnaDetails } from "../../../models/CommonModel";

export type HomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  CreateTrip: undefined;
  MainTripListing: undefined;
  ShipperTripDetails: { data: string };
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
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="PersonProfile"
            component={ShipperPersonProfile}
            options={{ title: "Create Profile" }}
          />
          <Stack.Screen
            name="CompanyProfile"
            component={ShipperCompanyProfile}
            options={{ title: "Add Company" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="MainTripListing"
          screenOptions={HeaderOptions}
        >
          <Stack.Screen
            name="MainTripListing"
            component={MainTripListing}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="ShipperTripDetails"
            component={ShipperTripDetails}
            options={{ title: "Trip Details" }}
          />
          <Stack.Screen
            name="CreateTrip"
            component={ShipperCreateTrip}
            options={{ title: "Create Trip" }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default connector(HomeStack);
