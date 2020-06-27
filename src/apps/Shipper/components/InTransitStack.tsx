import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTrip from "./CreateTrip";
import InTransitListing from "./InTransitListing";

const Stack = createStackNavigator();

const InTransitStack = () => {
  return (
    <Stack.Navigator initialRouteName="InTransitListing">
      <Stack.Screen name="InTransitListing" component={InTransitListing} />
      <Stack.Screen name="CreateTrip" options={{ title: "Create Trip" }}>
        {props => (
          <CreateTrip
            createTripCallback={() =>
              props.navigation.navigate("InTransitListing")
            }
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default InTransitStack;
