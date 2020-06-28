import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryListing from "./HistoryListing";

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
    </Stack.Navigator>
  );
};

export default HistoryStack;
