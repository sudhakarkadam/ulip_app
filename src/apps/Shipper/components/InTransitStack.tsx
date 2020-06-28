import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InTransitListing from "./InTransitListing";
import ShipperCreateTrip from "./ShipperCreateTrip";

const Stack = createStackNavigator();

const InTransitStack = () => {
  return (
    <Stack.Navigator initialRouteName="InTransitListing">
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
