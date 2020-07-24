import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InTransitListing from "./InTransitListing";
import ShipperCreateTrip from "./ShipperCreateTrip";
import TripTracking from "../../../components/TripTracking";
import { HeaderOptions } from "../../../components/@styled/BaseElements";

const Stack = createStackNavigator();

const InTransitStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="InTransitListing"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="InTransitListing"
        component={InTransitListing}
        options={{
          title: "In-Transit"
        }}
      />
      <Stack.Screen
        name="TripTracking"
        component={TripTracking}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CreateTrip"
        component={ShipperCreateTrip}
        options={{ title: "Create Trip" }}
      />
    </Stack.Navigator>
  );
};

export default InTransitStack;
