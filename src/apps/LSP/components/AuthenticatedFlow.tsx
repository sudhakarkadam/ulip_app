import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompanyProfile from "../../../components/CompanyProfile";
import { StackScreenProps } from "@react-navigation/stack";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  CreateTrip: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = StackScreenProps<RootStackParamList, "CompanyProfile">;

const AuthenticatedFlow = () => {
  return <Stack.Navigator initialRouteName="LSPHome"></Stack.Navigator>;
};

export default AuthenticatedFlow;
