import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import CreateProfile from "../../../components/CreateProfile";
import CompanyProfile from "../../../components/CompanyProfile";

const Stack = createStackNavigator();

const AuthenticatedFlow = () => {
  return (
    <Stack.Navigator initialRouteName="CardComp">
      <Stack.Screen name="CardComp" component={CardComp} />
      <Stack.Screen name="PersonProfile" component={CreateProfile} />
      <Stack.Screen
        name="CompanyProfile"
        component={() => (
          <CompanyProfile
            createCompanyCallback={() => console.log("profile created")}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedFlow;
