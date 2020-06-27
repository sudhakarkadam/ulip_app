import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverCreateProfile from "./DriverCreateProfile";
import DriverPersonProfile from "./DriverPersonProfile";
import TripStartPage from "./TripStartPage";
import TripDetailsPage from "./TripDetailsPage";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  TripStart: undefined;
  TripDetails: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedFlow = props => {
  const hasProfile = !!props.userInfo.user_details.name;
  return (
    <Stack.Navigator
      initialRouteName={hasProfile ? "TripStart" : "CreateProfile"}
    >
      <Stack.Screen
        name="CreateProfile"
        component={DriverCreateProfile}
        options={{ title: "Create Profile" }}
      />
      <Stack.Screen name="PersonProfile" component={DriverPersonProfile} />
      <Stack.Screen
        name="TripStart"
        component={(prop: RootStackParamList) => (
          <TripStartPage
            tripDetailsCallback={() => prop.navigation.navigate("TripDetails")}
          />
        )}
      />
      <Stack.Screen name="TripDetails" component={TripDetailsPage} />
    </Stack.Navigator>
  );
};

export default AuthenticatedFlow;
