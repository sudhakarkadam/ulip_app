/* eslint-disable @typescript-eslint/prefer-interface */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
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
  );
};

export default HomeStack;
