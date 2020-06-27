import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverCreateProfile from "./DriverCreateProfile";
import DriverPersonProfile from "./DriverPersonProfile";
import TripDetailsPage from "./TripDetailsPage";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  TripDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedFlow = () => {
  return (
    <Stack.Navigator initialRouteName="CreateProfile">
      <Stack.Screen
        name="CreateProfile"
        component={DriverCreateProfile}
        options={{ title: "Create Profile" }}
      />
      <Stack.Screen name="PersonProfile" component={DriverPersonProfile} />
      <Stack.Screen name="TripDetails" component={TripDetailsPage} />
    </Stack.Navigator>
  );
};

export default AuthenticatedFlow;
