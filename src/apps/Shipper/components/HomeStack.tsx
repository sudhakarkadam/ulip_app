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
    <Stack.Navigator initialRouteName="CreateProfile">
      <Stack.Screen name="CreateProfile" component={ShipperCreateProfile} />
      <Stack.Screen name="PersonProfile" component={ShipperPersonProfile} />
      <Stack.Screen name="CompanyProfile" component={ShipperCompanyProfile} />
      <Stack.Screen name="MainTripListing" component={MainTripListing} />
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
