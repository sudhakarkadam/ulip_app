import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompanyProfile from "../../../components/CompanyProfile";
import CreateTrip from "./CreateTrip";
import ShipperCreateProfile from "./ShipperCreateProfile";
import { StackScreenProps } from "@react-navigation/stack";
import ShipperPersonProfile from "./ShipperPersonProfile";
import ShipperHome from "./ShipperHome";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  CreateTrip: undefined;
  ShipperHome: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = StackScreenProps<RootStackParamList, "CompanyProfile">;

const AuthenticatedFlow = () => {
  return (
    <Stack.Navigator initialRouteName="ShipperHome">
      <Stack.Screen name="ShipperHome" component={ShipperHome} />
      <Stack.Screen
        name="CreateProfile"
        component={ShipperCreateProfile}
        options={{ title: "Create Profile" }}
      />
      <Stack.Screen name="PersonProfile" component={ShipperPersonProfile} />
      <Stack.Screen
        name="CompanyProfile"
        component={(props: Props) => (
          <CompanyProfile
            createCompanyCallback={() =>
              props.navigation.navigate("CreateTrip")
            }
          />
        )}
      />
      <Stack.Screen
        name="CreateTrip"
        component={CreateTrip}
        options={{ title: "Create Trip" }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedFlow;
