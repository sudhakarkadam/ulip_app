import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryListing from "./HistoryListing";
import ShipperTripDetails from "./ShipperTripDetails";

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="HistoryListing">
      <Stack.Screen
        name="HistoryListing"
        component={HistoryListing}
        options={{
          title: "History"
        }}
      />
      <Stack.Screen
        name="ShipperTripDetails"
        component={ShipperTripDetails}
        options={{ title: "Trip Details" }}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;
