import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryListing from "./HistoryListing";
import ShipperTripDetails from "./ShipperTripDetails";
import { HeaderOptions } from "../../../components/@styled/BaseElements";

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HistoryListing"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="HistoryListing"
        component={HistoryListing}
        options={{
          title: "History"
        }}
      />
      <Stack.Screen
        name="ShipperTripDetails"
        component={props => <ShipperTripDetails disableEWB {...props} />}
        options={{ title: "Trip Details" }}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;
