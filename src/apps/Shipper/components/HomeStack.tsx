/* eslint-disable @typescript-eslint/prefer-interface */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import { ShipperAppState } from "../reducers";
import ShipperPersonProfile from "./ShipperPersonProfile";
import ShipperCompanyProfile from "./ShipperCompanyProfile";
import ShipperCreateProfile from "./ShipperCreateProfile";
import MainTripListing from "./MainTripListing";
import ShipperCreateTrip from "./ShipperCreateTrip";

export type HomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  CreateTrip: undefined;
  MainTripListing: undefined;
};

const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});

const connector = connect(
  mapStateToProps,
  {} as any
);
const Stack = createStackNavigator<HomeStackParamList>();

type OwnProps = ConnectedProps<typeof connector>;

const HomeStack = (props: OwnProps) => {
  const { userInfo } = props;
  const profileCreated =
    userInfo && userInfo.user_details.name && userInfo.business_details;
  return (
    <>
      {!profileCreated ? (
        <Stack.Navigator initialRouteName="CreateProfile">
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
        <Stack.Navigator initialRouteName="MainTripListing">
          <Stack.Screen
            name="MainTripListing"
            component={MainTripListing}
            options={{ title: "Home" }}
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
