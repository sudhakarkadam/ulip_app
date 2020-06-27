import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTrip from "./CreateTrip";
import InTransitListing from "./InTransitListing";

const Stack = createStackNavigator();

const InTransitStack = () => {
  return (
    <Stack.Navigator initialRouteName="InTransitListing">
      <Stack.Screen name="InTransitListing" component={InTransitListing} />
      <Stack.Screen
        name="CreateTrip"
        component={(props: any) => (
          <CreateTrip
            createTripCallback={() =>
              props.navigation.navigate("InTransitListing")
            }
          />
        )}
        options={{ title: "Create Trip" }}
      />
    </Stack.Navigator>
  );
};

export default InTransitStack;
