import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import Trips from "./Trips";
import { LSPTripDetails } from "./LSPLanding";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type TripStackList = {
  Trips: {
    activeIndex?: number;
  };
  TripDetails: object;
};

const Stack = createStackNavigator<TripStackList>();
const TripStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Trips"} screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Trips"
        component={Trips}
        options={{ title: "Trips" }}
      />
      <Stack.Screen
        name="TripDetails"
        component={LSPTripDetails}
        options={{ title: "Trip" }}
      />
    </Stack.Navigator>
  );
};

export default TripStack;
