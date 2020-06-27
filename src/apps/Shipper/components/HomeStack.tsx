/* eslint-disable @typescript-eslint/prefer-interface */
import React from "react";
import {
  createStackNavigator,
  StackScreenProps
} from "@react-navigation/stack";
import ShipperPersonProfile from "./ShipperPersonProfile";
import ShipperCompanyProfile from "./ShipperCompanyProfile";
import CreateTrip from "./CreateTrip";
import ShipperCreateProfile from "./ShipperCreateProfile";
import MainTripListing from "./MainTripListing";

export type HomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  CreateTrip: undefined;
  MainTripListing: undefined;
};
const Stack = createStackNavigator<HomeStackParamList>();

type CreateTripProps = StackScreenProps<HomeStackParamList, "CreateTrip">;

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainTripListing">
      <Stack.Screen
        name="CreateProfile"
        component={ShipperCreateProfile}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="PersonProfile"
        component={ShipperPersonProfile}
        options={{ title: "Create Profile" }}
      />
      <Stack.Screen
        name="CompanyProfile"
        component={ShipperCompanyProfile}
        options={{ title: "Add Company" }}
      />
      <Stack.Screen
        name="MainTripListing"
        component={MainTripListing}
        options={{ title: "Home" }}
      />
      <Stack.Screen name="CreateTrip" options={{ title: "Create Trip" }}>
        {(props: CreateTripProps) => (
          <CreateTrip
            createTripCallback={() =>
              props.navigation.navigate("MainTripListing")
            }
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
