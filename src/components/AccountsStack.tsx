import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountsPage from "./AccountsPage";

const Stack = createStackNavigator();

const AccountsStack = () => {
  return (
    <Stack.Navigator initialRouteName="AccountsPage">
      <Stack.Screen
        name="AccountsPage"
        component={() => <AccountsPage persona={"shipper"} />}
        options={{
          title: "Accounts"
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountsStack;
