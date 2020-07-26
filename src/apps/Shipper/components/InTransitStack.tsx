import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InTransitListing from "./InTransitListing";
import ShipperCreateTrip from "./ShipperCreateTrip";
import { HeaderOptions } from "../../../components/@styled/BaseElements";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type IntransitStackParams = {
  InTransitListing: undefined;
  CreateTrip: undefined;
};

const Stack = createStackNavigator<IntransitStackParams>();

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
        name="CreateTrip"
        component={ShipperCreateTrip}
        options={{ title: "Create Trip" }}
      />
    </Stack.Navigator>
  );
};

export default InTransitStack;
